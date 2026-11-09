import React from 'react';

/*
 * Supporter
 *
 * 列定義の `contents` に渡す定型のセル描画関数をまとめたクラス。
 * 利用側で毎回書いていたヘルパーをライブラリ側で提供する。
 *
 * ノード種別ごとのパスやリンクの描画方法はアプリ側の都合なので、
 * コンストラクタのオプションで外から渡す。
 *
 *   const supporter = new Supporter({
 *       paths: { DB_TABLE: 'database/tables', SCREEN: 'screens' },
 *       defaultPath: 'wbs',
 *       link: (to, label) => <Link to={to}>{label}</Link>,
 *   });
 *
 *   const columns = [
 *       { label: 'ID',   leveling: true, contents: supporter.cellID },
 *       { label: 'Name', contents: supporter.cellLabel },
 *       { label: 'Use',  contents: supporter.cellFlag('use') },
 *   ];
 */
export default class Supporter {
    constructor (options) {
        const opts = options || {};

        this.indent      = opts.indent      !== undefined ? opts.indent      : '　';
        this.paths       = opts.paths       || {};
        this.defaultPath = opts.defaultPath !== undefined ? opts.defaultPath : 'wbs';
        this.link        = typeof opts.link === 'function' ? opts.link : null;
        this.marks       = Object.assign({ true: '○', false: '--' }, opts.marks || {});
        this.empty       = opts.empty !== undefined ? opts.empty : '';

        // contents にそのまま渡せるように this を束縛する。
        this.cellID          = this.cellID.bind(this);
        this.cellIDNotLink   = this.cellIDNotLink.bind(this);
        this.cellLabel       = this.cellLabel.bind(this);
        this.cellDescription = this.cellDescription.bind(this);
    }
    /* **************************************************************** *
     *  leveling                                                        *
     * **************************************************************** */
    margin (level) {
        let out = '';
        for (let i=0; i<level ;i++)
            out += this.indent;
        return out;
    }
    // 任意の contents 関数を、階層レベル分インデントして返すように包む。
    withMargin (contents) {
        return (column, data, key) => (
            <>
              <span>{this.margin(data._level || 0)}</span>
              <span>{contents(column, data, key)}</span>
            </>
        );
    }
    /* **************************************************************** *
     *  link                                                            *
     * **************************************************************** */
    nodeType (data) {
        return data._node_type !== undefined ? data._node_type : data._class;
    }
    path (data) {
        const p = this.paths[this.nodeType(data)];

        return p !== undefined ? p : this.defaultPath;
    }
    to (data) {
        return `/${this.path(data)}/${data._id}`;
    }
    /* **************************************************************** *
     *  cells                                                           *
     * **************************************************************** */
    cellID (column, data) {
        if (!this.link)
            return this.cellIDNotLink(column, data);

        return this.link(this.to(data), data._id, data);
    }
    cellIDNotLink (column, data) {
        return data._id;
    }
    cellLabel (column, data) {
        return this.valueOrEmpty(data.label);
    }
    cellDescription (column, data) {
        return this.valueOrEmpty(data.description);
    }
    /* **************************************************************** *
     *  cell factories                                                  *
     * **************************************************************** */
    // data[key] をそのまま返す contents 関数を作る。
    cellValue (key) {
        return (column, data) => this.valueOrEmpty(data[key]);
    }
    // data._core[key] をそのまま返す contents 関数を作る。
    cellCoreValue (key) {
        return (column, data) => this.valueOrEmpty(data._core ? data._core[key] : undefined);
    }
    // 真偽値を marks（既定は ○ と --）で表示する contents 関数を作る。
    cellFlag (key, marks) {
        const m = Object.assign({}, this.marks, marks || {});

        return (column, data) => {
            const v = data[key] !== undefined
                  ? data[key]
                  : (data._core ? data._core[key] : undefined);

            return v===true ? m.true : m.false;
        };
    }
    // ノード種別ごとに contents 関数を切り替える。該当がなければ fallback を使う。
    cellByType (table, fallback) {
        const fb = fallback || this.cellLabel;

        return (column, data, key) => {
            const f = table[this.nodeType(data)];

            return (typeof f === 'function' ? f : fb)(column, data, key);
        };
    }
    /* **************************************************************** *
     *  utils                                                           *
     * **************************************************************** */
    valueOrEmpty (v) {
        return (v===null || v===undefined) ? this.empty : v;
    }
}

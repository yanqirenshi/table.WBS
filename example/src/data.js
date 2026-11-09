export const PROJECTS = [
    {
        _id: 1,
        _class: 'PROJECT',
        label: '社内ポータル刷新',
        description: '老朽化した社内ポータルを刷新する。',
    }
];

export const WBS = [
    {
        _id: 10,
        _class: 'WBS',
        label: '要件定義',
        description: '現状の課題を整理し、新ポータルの要件を決める。',
    },
    {
        _id: 20,
        _class: 'WBS',
        label: '設計',
        description: '要件をもとにシステムを設計する。',
    },
    {
        _id: 21,
        _class: 'WBS',
        label: '基本設計',
        description: '画面・データベースの構成を決める。',
    },
    {
        _id: 22,
        _class: 'WBS',
        label: '詳細設計',
        description: '実装に必要な仕様を詰める。',
    },
    {
        _id: 30,
        _class: 'WBS',
        label: '実装',
        description: '設計にもとづいてプログラムを作る。',
    },
    {
        _id: 40,
        _class: 'WBS',
        label: 'テスト',
        description: '品質を確認して本番公開に備える。',
    },
];

export const WORKPACKAGES = [
    {
        _id: 100,
        _class: 'WORKPACKAGE',
        label: '現状調査',
        description: '既存ポータルの利用状況とアクセスログを調べる。',
    },
    {
        _id: 101,
        _class: 'WORKPACKAGE',
        label: '要件ヒアリング',
        description: '各部門の担当者に要望を聞き取る。',
    },
    {
        _id: 210,
        _class: 'WORKPACKAGE',
        label: '画面設計',
        description: '画面一覧とワイヤーフレームを作る。',
    },
    {
        _id: 211,
        _class: 'WORKPACKAGE',
        label: 'DB 設計',
        description: 'ER 図とテーブル定義書を作る。',
    },
    {
        _id: 220,
        _class: 'WORKPACKAGE',
        label: 'API 設計',
        description: 'エンドポイントとリクエスト・レスポンスを定義する。',
    },
    {
        _id: 300,
        _class: 'WORKPACKAGE',
        label: 'フロントエンド実装',
        description: 'React で画面を実装する。',
    },
    {
        _id: 301,
        _class: 'WORKPACKAGE',
        label: 'バックエンド実装',
        description: 'API とバッチ処理を実装する。',
    },
    {
        _id: 400,
        _class: 'WORKPACKAGE',
        label: '単体テスト',
        description: 'モジュールごとに動作を確認する。',
    },
    {
        _id: 401,
        _class: 'WORKPACKAGE',
        label: '総合テスト',
        description: '業務シナリオに沿って通しで確認する。',
    },
];

let i = 10000000;
const edge = (from_id, from_class, to_id, to_class) => ({
    _id: i++,
    from_id,
    from_class,
    to_id,
    to_class,
});

export const EDGES = [
    // PROJECT -> WBS
    edge(1,  'PROJECT', 10, 'WBS'),
    edge(1,  'PROJECT', 20, 'WBS'),
    edge(1,  'PROJECT', 30, 'WBS'),
    edge(1,  'PROJECT', 40, 'WBS'),
    // WBS -> WBS
    edge(20, 'WBS', 21, 'WBS'),
    edge(20, 'WBS', 22, 'WBS'),
    // WBS -> WORKPACKAGE
    edge(10, 'WBS', 100, 'WORKPACKAGE'),
    edge(10, 'WBS', 101, 'WORKPACKAGE'),
    edge(21, 'WBS', 210, 'WORKPACKAGE'),
    edge(21, 'WBS', 211, 'WORKPACKAGE'),
    edge(22, 'WBS', 220, 'WORKPACKAGE'),
    edge(30, 'WBS', 300, 'WORKPACKAGE'),
    edge(30, 'WBS', 301, 'WORKPACKAGE'),
    edge(40, 'WBS', 400, 'WORKPACKAGE'),
    edge(40, 'WBS', 401, 'WORKPACKAGE'),
];

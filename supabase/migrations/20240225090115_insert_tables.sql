INSERT INTO timeline (id) VALUES (1);
INSERT INTO timeline (id) VALUES (2);
INSERT INTO timeline (id) VALUES (3);
INSERT INTO timeline (id) VALUES (4);
INSERT INTO timeline (id) VALUES (5);
INSERT INTO timeline (id) VALUES (6);
INSERT INTO timeline (id) VALUES (7);
INSERT INTO timeline (id) VALUES (8);
INSERT INTO timeline (id) VALUES (9);
INSERT INTO timeline (id) VALUES (10);

INSERT INTO tags (name) VALUES ('プログラミング');
INSERT INTO tags (name) VALUES ('デザイン');
INSERT INTO tags (name) VALUES ('マーケティング');
INSERT INTO tags (name) VALUES ('生活');
INSERT INTO tags (name) VALUES ('読書');

INSERT INTO external_links (title, description, url) VALUES ('PostgreSQL 公式ドキュメンテーション', 'PostgreSQLの基本的な使い方について学習できます。', 'https://www.postgresql.org/docs/');
INSERT INTO external_links (title, description, url) VALUES ('CSS Tricks', 'CSSに関する様々なテクニックを紹介しています。', 'https://css-tricks.com/');
INSERT INTO external_links (title, description, url) VALUES ('生活の知恵', '生活で役に立つアドバイスがたくさん載っています。', 'https://www.lifehack.org/');
INSERT INTO external_links (title, description, url) VALUES ('読書メーター', '読んだ本の管理や感想を共有できます。', 'https://bookmeter.com/');
INSERT INTO external_links (title, description, url) VALUES ('JavaScriptチュートリアル', 'JavaScriptの学習に役立つ情報が満載です。', 'https://example.com/javascript-tutorial');

INSERT INTO external_links_tags (external_link_id, tag_id) VALUES (1, 1);
INSERT INTO external_links_tags (external_link_id, tag_id) VALUES (2, 1);
INSERT INTO external_links_tags (external_link_id, tag_id) VALUES (2, 2);
INSERT INTO external_links_tags (external_link_id, tag_id) VALUES (3, 4);
INSERT INTO external_links_tags (external_link_id, tag_id) VALUES (4, 5);
INSERT INTO external_links_tags (external_link_id, tag_id) VALUES (5, 1);

INSERT INTO external_link_timeline (timeline_id, external_link_id) VALUES (1, 1);
INSERT INTO external_link_timeline (timeline_id, external_link_id) VALUES (3, 2);
INSERT INTO external_link_timeline (timeline_id, external_link_id) VALUES (4, 3);
INSERT INTO external_link_timeline (timeline_id, external_link_id) VALUES (8, 4);
INSERT INTO external_link_timeline (timeline_id, external_link_id) VALUES (9, 5);

INSERT INTO articles (title, content) VALUES ('PostgreSQLの基本的な使い方', 'PostgreSQLはオープンソースのリレーショナルデータベース管理システムです。');
INSERT INTO articles (title, content, slag) VALUES ('CSSの基本的な使い方', 'CSSはHTML文書のスタイルを指定するための言語です。', '2020-01-02');
INSERT INTO articles (title, content) VALUES ('生活で役立つ知恵', '生活で役立つアドバイスがたくさん載っています。');
INSERT INTO articles (title, content, slag) VALUES ('読書メーターの使い方', '読んだ本の管理や感想を共有できます。', '2020-01-04');
INSERT INTO articles (title, content, slag) VALUES ('JavaScriptの基本的な使い方', 'JavaScriptはWebページに動的な要素を追加するための言語です。', '2020-01-05');

INSERT INTO articles_tags (article_id, tag_id) VALUES (1, 1);
INSERT INTO articles_tags (article_id, tag_id) VALUES (2, 1);
INSERT INTO articles_tags (article_id, tag_id) VALUES (2, 2);
INSERT INTO articles_tags (article_id, tag_id) VALUES (3, 4);
INSERT INTO articles_tags (article_id, tag_id) VALUES (4, 4);
INSERT INTO articles_tags (article_id, tag_id) VALUES (5, 1);

INSERT INTO article_timeline (timeline_id, article_id) VALUES (2, 1);
INSERT INTO article_timeline (timeline_id, article_id) VALUES (5, 2);
INSERT INTO article_timeline (timeline_id, article_id) VALUES (6, 3);
INSERT INTO article_timeline (timeline_id, article_id) VALUES (7, 4);
INSERT INTO article_timeline (timeline_id, article_id) VALUES (10, 5);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    user_id TEXT PRIMARY KEY,
    created_at TEXT,
    email TEXT,
    password TEXT,
    username TEXT
);

INSERT INTO users (user_id, created_at, email, password, username)
VALUES
    ('f3a8e3b4-9c27-4a6d-bd18-7e17c5a8d92f', '2024-03-01T12:34:56Z', 'test@test.com', 'qwerty123', 'TestyMcTestFace'),
    ('e15ef5f9-e089-4464-8c9d-fa616136047b', '2024-03-01T12:34:56Z', 'meme@meme.com', 'qwerty123', 'MemeLord69420');

DROP TABLE IF EXISTS collections;
CREATE TABLE collections (
    collection_id TEXT PRIMARY KEY,
    created_at TEXT,
    title TEXT,
    description TEXT,
    links BLOB,
    sections BLOB,
    user_id TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO collections (collection_id, created_at, title, description, links, sections, user_id)
VALUES
    ('e4b3956d-e4e6-4cac-8162-3d759a0efffd', '2024-03-01T12:34:56Z', 'Collection 1', 'Description for Collection 1', '[{"title": "Link 1","url": "https://example.com/link1"},{"title": "Link 2","url": "https://example.com/link2"},{"title": "Link 99","url": "https://example.com/link99"},{"title": "Link 100","url": "https://example.com/link100"}]', '[{"title": "Section 1","description": "Links 1-10","links": [{"title": "Link 1","url": "https://example.com/link1"},{"title": "Link 2","url": "https://example.com/link2"}]}]', 'f3a8e3b4-9c27-4a6d-bd18-7e17c5a8d92f'),
    ('e712e5a5-4663-4ab5-8422-e3ff3f64ba45', '2024-03-01T12:34:56Z', 'Collection 2', 'Description for Collection 2', '[{"title": "Link 1","url": "https://example.com/link1"},{"title": "Link 2","url": "https://example.com/link2"},{"title": "Link 99","url": "https://example.com/link99"},{"title": "Link 100","url": "https://example.com/link100"}]', '[{"title": "Section 1","description": "Links 1-10","links": [{"title": "Link 1","url": "https://example.com/link1"},{"title": "Link 2","url": "https://example.com/link2"}]}]', 'f3a8e3b4-9c27-4a6d-bd18-7e17c5a8d92f'),
    ('ce2693f2-0c1c-45db-b927-7ccd35657d57', '2024-03-01T12:34:56Z', 'Collection 3', 'Description for Collection 3', '[{"title": "Link 1","url": "https://example.com/link1"},{"title": "Link 2","url": "https://example.com/link2"},{"title": "Link 99","url": "https://example.com/link99"},{"title": "Link 100","url": "https://example.com/link100"}]', '[{"title": "Section 1","description": "Links 1-10","links": [{"title": "Link 1","url": "https://example.com/link1"},{"title": "Link 2","url": "https://example.com/link2"}]}]', 'e15ef5f9-e089-4464-8c9d-fa616136047b');


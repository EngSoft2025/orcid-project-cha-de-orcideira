CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  orcid_id VARCHAR(19) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS researchers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  orcid_id VARCHAR(19) UNIQUE NOT NULL,
  avatar VARCHAR(255),
  bio TEXT,
  institution VARCHAR(255),
  country VARCHAR(100),
  h_index INT DEFAULT 0,
  user_id INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  researcher_id INT REFERENCES researchers(id)
);

CREATE TABLE IF NOT EXISTS papers (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  abstract TEXT,
  journal VARCHAR(255),
  year INT,
  citations INT DEFAULT 0,
  doi VARCHAR(100),
  pdf_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS paper_authors (
  id SERIAL PRIMARY KEY,
  paper_id INT REFERENCES papers(id),
  author_id INT REFERENCES authors(id),
  UNIQUE(paper_id, author_id)
);

CREATE TABLE IF NOT EXISTS researcher_education (
  id SERIAL PRIMARY KEY,
  researcher_id INT REFERENCES researchers(id),
  degree VARCHAR(100),
  institution VARCHAR(255),
  field VARCHAR(255),
  start_date DATE,
  end_date DATE,
  UNIQUE(researcher_id, degree, institution)
);

CREATE TABLE IF NOT EXISTS researcher_jobs (
  id SERIAL PRIMARY KEY,
  researcher_id INT REFERENCES researchers(id),
  role VARCHAR(100),
  organization VARCHAR(255),
  start_date DATE,
  end_date DATE,
  UNIQUE(researcher_id, role, organization)
);

CREATE TABLE IF NOT EXISTS researcher_citations (
  id SERIAL PRIMARY KEY,
  researcher_id INT REFERENCES researchers(id),
  year INT,
  citation_count INT,
  UNIQUE(researcher_id, year)
);

CREATE TABLE IF NOT EXISTS researcher_publications (
  id SERIAL PRIMARY KEY,
  researcher_id INT REFERENCES researchers(id),
  year INT,
  publication_count INT,
  UNIQUE(researcher_id, year)
);

CREATE TABLE IF NOT EXISTS files (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  mimetype VARCHAR(100),
  path VARCHAR(255) NOT NULL,
  size BIGINT,
  uploaded_by INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
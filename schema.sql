CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('WA', 'MA', 'Admin') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type ENUM('inward', 'outward') NOT NULL,
  document_name VARCHAR(255) NOT NULL,
  from_where VARCHAR(255) NOT NULL,
  to_where VARCHAR(255) NOT NULL,
  frang_date DATE NOT NULL,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  action ENUM('create', 'update', 'delete') NOT NULL,
  table_name VARCHAR(255) NOT NULL,
  record_id INT NOT NULL,
  changes JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);


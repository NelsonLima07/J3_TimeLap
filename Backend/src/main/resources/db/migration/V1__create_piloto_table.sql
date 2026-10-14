CREATE TABLE piloto (
    id BIGSERIAL PRIMARY KEY,
    datacadastro DATE,
    horacadastro TIME,
    delete_at TIMESTAMP,
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE,
    apelido VARCHAR(100),
    numero INTEGER UNIQUE
);
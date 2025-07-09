import { client } from '../db/client';

export const MunicipioRepository = {
  async findAll() {
    const result = await client.query('SELECT * FROM municipios');
    return result.rows;
  },

  async findByNome(nome: string) {
    const result = await client.query(
      'SELECT * FROM municipios WHERE nome ILIKE $1',
      [`%${nome}%`]
    );
    return result.rows;
  },

  async findByPopulacaoMin(min: number) {
    const result = await client.query(
      `SELECT *
      FROM municipios
      WHERE populacao >= $1
      ORDER BY populacao DESC`,
      [min]
    );
    return result.rows;
  },

  async findByPopulacaoRange(min: number, max: number) {
    const result = await client.query(
      `SELECT *
      FROM municipios
      WHERE populacao BETWEEN $1 AND $2
      ORDER BY populacao DESC`,
      [min, max]
    );
    return result.rows;
  },

  async top10MaisPopulososNaoCapitais() { 
    const result = await client.query(
      `SELECT *
      FROM municipios
      WHERE capital = false
      ORDER BY populacao DESC
      LIMIT 10
    `
    );
    return result.rows;
  },

  async estadosComCapitalNaoMaisPopulosa() {
    const result = await client.query(`
      SELECT estado, nome, populacao
      FROM municipios m
      WHERE populacao = (
        SELECT MAX(populacao)
        FROM municipios
        WHERE estado = m.estado
      )
      AND NOT EXISTS (
        SELECT 1
        FROM municipios cap
        WHERE cap.estado = m.estado AND cap.capital = true AND cap.nome = m.nome
      )
      ORDER BY estado;
    `);
    return result.rows;
  }
    
};

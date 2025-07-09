import { MunicipioRepository } from '../repositories/municipioRepository';

export const MunicipioService = {
  getAll: () => MunicipioRepository.findAll(),
  searchByName: (nome: string) => MunicipioRepository.findByNome(nome),
  getByMinPop: (min: number) => MunicipioRepository.findByPopulacaoMin(min),
  getByPopRange: (min: number, max: number) => MunicipioRepository.findByPopulacaoRange(min, max),
  getEstadosCapitalNaoMaisPop: () => MunicipioRepository.estadosComCapitalNaoMaisPopulosa(),
  getTop10NaoCapitais: () => MunicipioRepository.top10MaisPopulososNaoCapitais()
};
// This service interacts with the MunicipioRepository to fetch data.
// It provides methods to get all municipios and search for municipios by name.
import { carritoService, medicamentosService } from '../firebase/database';

export const farmaciaAPI = {
    ...medicamentosService,
    ...carritoService
};

export default farmaciaAPI;
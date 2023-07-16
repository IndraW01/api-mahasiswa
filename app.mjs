import http from "http";
import { MahasiswaService } from "./mahasiswa-service.mjs";

const service = new MahasiswaService();

const server = http.createServer((request, response) => {

  response.setHeader('Content-Type', 'application/json');

  if (request.method == 'GET') {
    service.getMahasiswa(request, response);
  } else if (request.method == 'POST') {
    service.createMahasiswa(request, response);
  } else if (request.method == 'DELETE') {
    service.deleteMahasiswa(request, response);
  } else if (request.method == 'PUT') {
    service.updateMahasiswa(request, response);
  }
})

server.listen(3000);
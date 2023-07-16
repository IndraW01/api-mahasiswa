export class MahasiswaService {
  errorInput = [];

  mahasiswas = [
    {
      nim: 1915036001,
      nama: "Indra Wijaya",
      jurusan: "Sistem Informasi"
    },
    {
      nim: 1915036002,
      nama: "Jauhari Fadli Jaunum",
      jurusan: "Informatika"
    },
    {
      nim: 1915036003,
      nama: "Muhammad Alpitriansyah",
      jurusan: "Teknik Industri"
    },
  ];

  statusSuccessJson(code, status, data) {
    return JSON.stringify({
      code,
      status,
      data
    });
  }

  statusErrorJson(code, status, error) {
    return JSON.stringify({
      code,
      status,
      error
    });
  }

  getMahasiswaJson() {
    return JSON.stringify({
      code: 200,
      status: 'OK',
      data: this.mahasiswas.map(({ nim, nama, jurusan }, key) => ({ id: key, nim, nama, jurusan }))
    });
  }

  getMahasiswa(request, response) {
    response.write(this.getMahasiswaJson())
    response.end();
  }

  createMahasiswa(request, response) {
    request.addListener('data', (data) => {
      const body = JSON.parse(data.toString())

      if (body.nim == '') {
        this.errorInput.push('Nim tidak boleh kosong');
      }
      if (body.nama == '') {
        this.errorInput.push('Nama tidak boleh kosong');
      }
      if (body.jurusan == '') {
        this.errorInput.push('Jurusan tidak boleh kosong');
      }

      if (this.errorInput.length > 0) {
        response.statusCode = 422;
        response.write(this.statusErrorJson(422, 'Unprocessable Entity', this.errorInput));
        response.end();

        this.errorInput = [];
      } else {
        this.mahasiswas.push(body);

        response.statusCode = 201;
        response.write(this.statusSuccessJson(201, 'Created', body));
        response.end();
      }
    });
  }

  updateMahasiswa(request, response) {
    request.addListener('data', (data) => {
      const body = JSON.parse(data.toString());
      const { id, ...mhs } = body;

      if (this.mahasiswas[body.id]) {
        if (body.nim == '') {
          this.errorInput.push('Nim tidak boleh kosong');
        }
        if (body.nama == '') {
          this.errorInput.push('Nama tidak boleh kosong');
        }
        if (body.jurusan == '') {
          this.errorInput.push('Jurusan tidak boleh kosong');
        }

        if (this.errorInput.length > 0) {
          response.statusCode = 422;
          response.write(this.statusErrorJson(422, 'Unprocessable Entity', this.errorInput));
          response.end();

          this.errorInput = [];
        } else {
          this.mahasiswas[id] = mhs;
          response.write(this.statusSuccessJson(200, 'OK', mhs));
          response.end();
        }
      } else {
        response.statusCode = 404;
        response.write(this.statusErrorJson(404, 'Not Found', "Data tidak ada"));
        response.end();
      }
    });
  }

  deleteMahasiswa(request, response) {
    request.addListener('data', (data) => {
      const body = JSON.parse(data.toString());

      if (this.mahasiswas[body.id]) {
        this.mahasiswas.splice(body.id, 1);
        response.write(this.statusSuccessJson(200, 'OK', 'Mahasiswa berhasil dihapus'));
        response.end();
      } else {
        response.statusCode = 404;
        response.write(this.statusErrorJson(404, 'Not Found', "Data tidak ada"));
        response.end();
      }
    });
  }
}
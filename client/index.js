import Web3 from "web3";
import Crud from "../build/contracts/Crud.json";

let web3, crud;
// let spinner = document.getElementById("loader");
const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      window.ethereum
        .enable()
        .then(() => resolve(new Web3(window.ethereum)))
        .catch((error) => reject(error));
    }
    if (typeof window.web3 !== "undefined") {
      return resolve(new Web3(window.web3.currentProvider));
    }
    resolve(new Web3("http://localhost:9545"));
  });
};

const initContract = () => {
  const deploymentKey = Object.keys(Crud.networks)[0];
  return new web3.eth.Contract(Crud.abi, Crud.networks[deploymentKey].address);
};

const initApp = () => {
  const $create = document.getElementById("create");
  const $createverifikator = document.getElementById("create-verifikator");

  const $createResult = document.getElementById("create-result");
  const $createverifikatorResult = document.getElementById("create-verifikator-result");

  const $read = document.getElementById("read");
  const $readverifikator = document.getElementById("read-verifikator");

  const $readResult = document.getElementById("read-result");  
  const $readverifikatorResult = document.getElementById("read-verifikator-result");

  const $edit = document.getElementById("edit");
  const $editverifikator = document.getElementById("edit-verifikator");

  const $editResult = document.getElementById("edit-result");
  const $editverifikatorResult = document.getElementById("edit-verifikator-result");

  const $delete = document.getElementById("delete");
  const $deleteverifikator = document.getElementById("delete-verifikator");

  const $deleteResult = document.getElementById("delete-result");
  const $deleteverifikatorResult = document.getElementById("delete-verifikator-result");

  //get all the accounts
  let accounts = [];
  web3.eth.getAccounts().then((acc) => (accounts = acc));

  $create.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    const docsname = e.target.elements[1].value;
    const docscreator = e.target.elements[2].value;
    const creatorunit = e.target.elements[3].value;
    const creatorid = e.target.elements[4].value;
    const docssignname = e.target.elements[5].value;
    const docssigndate = e.target.elements[6].value;

    const document = crud.methods
      .insertDocument(id, docsname, docscreator, creatorunit, creatorid, docssignname, docssigndate)
      .send({ from: accounts[0] });
    document.getElementById("loader").style.display = "block";
    document.then((result) => {
      document.getElementById("loader").style.display = "none";
      console.log(result);
      $createResult.innerHTML = `Dokumen ${id} Ditambahkan`;
    });
  });

  $createverifikator.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    const docsname = e.target.elements[1].value;
    const verificatorname = e.target.elements[2].value;
    const verificatorunit = e.target.elements[3].value;
    const verificatorid = e.target.elements[4].value;
    const verificationdate = e.target.elements[5].value;

    const verifikator = crud.methods
      .insertVerificator(id, docsname, verificatorname, verificatorunit, verificatorid, verificationdate)
      .send({ from: accounts[0] });
    verifikator.getElementById("loader").style.display = "block";
    verifikator.then((result) => {
      verifikator.getElementById("loader").style.display = "none";
      console.log(result);
      $createverifikatorResult.innerHTML = `Verifikator Ditambahkan:<br/> Kode Dokumen: ${id} <br/> Nama Dokumen: ${docsname} <br/> Nama Verifikator: ${verificatorname} <br/> Unit Verifikasi: ${verificatorunit} <br/> NIP Verifikator: ${verificatorid} <br/> Tanggal Verifikasi : ${verificationdate}`;
    });
  });

  $read.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    crud.methods
      .readDocumentById(id)
      .call()
      .then((result) => {
        $readResult.innerHTML = `Kode Dokumen: ${result[0]} <br/> Nama Dokumen: ${result[1]} <br/> Pembuat Dokumen: ${result[2]} <br/> Unit Pembuat: ${result[3]}<br/> NIP Pembuat: ${result[4]} <br/> Penanda Tangan Dokumen : ${result[5]}<br/> Tanggal Tanda Tangan : ${result[6]}`;
      })
      .catch((_e) => {
        $readResult.innerHTML = `Dokumen ${id} Tidak Ditemukan. Pastikan Data Sudah Terinput Ke Sistem Blockchain Dan Tidak Terhapus.`;
      });
  });

  $readverifikator.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    crud.methods
      .readVerificatorById(id)
      .call()
      .then((result) => {
        $readverifikatorResult.innerHTML = `Kode Dokumen: ${result[0]} <br/> Nama Dokumen: ${result[1]} <br/> Nama Verifikator: ${result[2]} <br/> Unit Verifikasi: ${result[3]} <br/> NIP Verifikator: ${result[4]} <br/> Tanggal Verifikasi : ${result[5]}`;
      })
      .catch((_e) => {
        $readverifikatorResult.innerHTML = `Verifikator Dokumen ${id} Tidak Ditemukan. Pastikan Data Sudah Terinput Ke Sistem Blockchain Dan Tidak Terhapus.`;
      });
  });

  $edit.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    const docsname = e.target.elements[1].value;
    const docscreator = e.target.elements[2].value;
    const creatorunit = e.target.elements[3].value;
    const creatorid = e.target.elements[4].value;
    const docssignname = e.target.elements[5].value;
    const docssigndate = e.target.elements[6].value;

    crud.methods
      .updateDocumentById(id, docsname, docscreator, creatorunit, creatorid, docssignname, docssigndate)
      .send({ from: accounts[0] })
      .then((result) => {
        $editResult.innerHTML = `Dokumen Diupdate: <br/> Kode Dokumen: ${id} <br/> Nama Dokumen: ${docsname} <br/> Pembuat Dokumen: ${docscreator} <br/> Unit Pembuat: ${creatorunit} <br/> NIP Pembuat: ${creatorid} <br/> Penanda Tangan Dokumen : ${docssignname} <br/> Tanggal Tanda Tangan : ${docssigndate}`;
      })
      .catch((_e) => {
        $editResult.innerHTML = ` Ada Kesalahan Dalam Melakukan Update Dokumen ${id}`;
      });
  });

  $editverifikator.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    const docsname = e.target.elements[1].value;
    const verificatorname = e.target.elements[2].value;
    const verificatorunit = e.target.elements[3].value;
    const verificatorid = e.target.elements[4].value;
    const verificationdate = e.target.elements[5].value;

    crud.methods
      .updateVerificatorById(id, docsname, verificatorname, verificatorunit, verificatorid, verificationdate)
      .send({ from: accounts[0] })
      .then((result) => {
        $editverifikatorResult.innerHTML = `Verifikator Diupdate Diupdate: <br/> Kode Dokumen: ${id} <br/> Nama Dokumen: ${docsname} <br/> Nama Verifikator: ${verificatorname} <br/> Unit Verifikasi: ${verificatorunit} <br/> NIP Verifikator: ${verificatorid} <br/> Tanggal Verifikasi : ${verificationdate}`;
      })
      .catch((_e) => {
        $editverifikatorResult.innerHTML = ` Ada Kesalahan Dalam Melakukan Update Verifikator Dokumen ${id}`;
      });
  });

  $delete.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    crud.methods
      .DeleteDocumentById(id)
      .send({ from: accounts[0] })
      .then((result) => {
        $deleteResult.innerHTML = `Dokumen ${id} Dihapus`;
      })
      .catch((_e) => {
        $deleteResult.innerHTML = `Ada Kesalahan Dalam Menghapus Dokumen ${id}`;
      });
  });

  $deleteverifikator.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    crud.methods
      .DeleteVerificatorById(id)
      .send({ from: accounts[0] })
      .then((result) => {
        $deleteverifikatorResult.innerHTML = `Dokumen ${id} Dihapus`;
      })
      .catch((_e) => {
        $deleteverifikatorResult.innerHTML = `Ada Kesalahan Dalam MenghapusVerifikator Dokumen ${id}`;
      });
  });

};



document.addEventListener("DOMContentLoaded", () => {
  initWeb3()
    .then((_web3) => {
      web3 = _web3;
      crud = initContract();
      initApp();
    })
    .catch((e) => console.log(e.message));
});
const Crud = artifacts.require('Crud');

contract('Crud', () => {
  let crud = null;
  before(async () => {
    crud = await Crud.deployed();
  });

  it('Should create a new document', async () => {
    await crud.insertDocument('KD.164/AKD9/TE-DEK/2021', 'PENETAPAN JUDUL, PEMBIMBING DAN MASA BERLAKU KARYA AKHIR MAHASISWA PROGRAM STUDI S1 TEKNIK KOMPUTER', 'Dr. BAMBANG SETIA NUGROHO, S.T., M.T.', 'DEKAN FAKULTAS TEKNIK ELEKTRO', '1212ab1313', 'Dr. BAMBANG SETIA NUGROHO, S.T., M.T.', '30 Maret 2021');
    const document = await crud.readDocumentById(1);
    assert(document[0].toNumber() === 1);
    assert(document[1] === 'KD.164/AKD9/TE-DEK/2021');
  });

});



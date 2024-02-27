const express = require("express");
const app = express();

const providers = [
  {
    cif: "12345678A",
    name: "Don Limpio S.L.",
    field: "Servicios de limpieza",
    address: "Calle de los Cachopos, 12",
    city: "Málaga",
    postalcode: "45278",
    phone: "987654321",
  },
  {
    cif: "98765432B",
    name: "Papeles, Bolígrafos, ETC",
    field: "Suministro de material de oficina",
    address: "Avenida Europa, 46",
    city: "Madrid",
    postalcode: "08873",
    phone: "933465671",
  },
  {
    cif: "56789012C",
    name: "Bocados de cielo",
    field: "Servicios de catering",
    address: "Polígono Industrial, 149",
    city: "Valencia",
    postalcode: "67160",
    phone: "971186200",
  },
  {
    cif: "34567890D",
    name: "LadrilloKing",
    field: "Servicios de construcción",
    address: "Calle Secundaria, 321",
    city: "Marbella",
    postalcode: "23456",
    phone: "984711301",
  },
  {
    cif: "65432198E",
    name: "Tulipán & Co",
    field: "Servicios de jardinería",
    address: "Calle de los Jardines, 654",
    city: "Barcelona",
    postalcode: "08905",
    phone: "933123116",
  },
  {
    cif: "78901234F",
    name: "Construcciones Juan",
    field: "Suministro de material de construcción",
    address: "Avenida de Obras, 79",
    city: "Bilbao",
    postalcode: "41672",
    phone: "984688200",
  },
  {
    cif: "23456789G",
    name: "Manitas S.A.",
    field: "Servicios de mantenimiento",
    address: "Calle Falsa, 99",
    city: "Albacete",
    postalcode: "66189",
    phone: "919007147",
  },
  {
    cif: "45678901H",
    name: "FontaNET",
    field: "Servicios de fontanería",
    address: "Calle del Agua, 231",
    city: "Alicante",
    postalcode: "71901",
    phone: "922343890",
  },
];

app.get("/", (req, res) => {
  res.status(200).json({
    message: "OK",
    providers: providers,
  });
});

app.get("/:cif", (req, res) => {
  if (!req.params.cif) {
    return res.status(400).json({
      message: "CIF obligatorio",
    });
  }

  const cifToSearch = req.params.cif;
  const thisProvider = providers.find((elem) => elem.cif === cifToSearch);

  if (!thisProvider) {
    return res.status(404).json({
      message: "Proveedor no encontrado con ese CIF",
    });
  }

  res.status(200).json({
    message: "OK",
    providers: thisProvider,
  });
});

app.post("/", (req, res) => {
  const newProvider = req.body;
  const existingProvider = providers.find(
    (provider) => provider.cif === newProvider.cif
  );

  if (!newProvider.cif) {
    return res.status(400).json({
      message: "CIF obligatorio",
    });
  } else if (existingProvider) {
    return res.status(409).json({
      message: "Ya existe un proveedor con este CIF",
    });
  } else {
    providers.push(newProvider);
    res.status(200).json({
      message: "Proveedor creado con éxito",
      provider: newProvider,
    });
  }
});

app.put("/:cif", (req, res) => {
  if (!req.params.cif) {
    res.status(400).json({
      message: "CIF obligatorio",
    });
  }
  const providerIndex = providers.findIndex((elem) => {
    return elem.cif === req.params.cif;
  });
  if (providerIndex < 0) {
    return res.status(404).json({
      message: "Proveedor no encontrado con ese CIF",
    });
  }
  for (const property in req.body) {
    console.log(property);
    providers[providerIndex][property] = req.body[property];
  }
  res.status(200).json({
    message: "OK",
    providers: providers[providerIndex],
  });
});

app.delete("/:cif", (req, res) => {
  if (!req.params.cif) {
    return res.status(400).json({
      message: "CIF obligatorio",
    });
  }
  const providerIndex = providers.findIndex((elem) => {
    return elem.cif === req.params.cif;
  });
  if (providerIndex < 0) {
    return res.status(404).json({
      message: "Proveedor no encontrado con ese cif",
    });
  }
  const deletedProvider = providers.splice(providerIndex, 1);

  res.status(200).json({
    message: "OK",
    deletedProvider,
  });
});

module.exports = app;
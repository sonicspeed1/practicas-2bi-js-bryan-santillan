const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;


const assetsPath = path.join(__dirname, '../frontend/src/assets');

app.use(bodyParser.json());
app.use(cors());


app.get('/facturas', (req, res) => {
  fs.readFile(path.join(assetsPath, 'datos.json'), (err, data) => {
    if (err && err.code !== 'ENOENT') {
      return res.status(500).json({ error: 'Error al leer el archivo de datos' });
    }

    const facturas = data ? JSON.parse(data) : [];
    res.status(200).json(facturas);
  });
});


app.post('/facturas', (req, res) => {
  const factura = req.body;

  fs.readFile(path.join(assetsPath, 'datos.json'), (err, data) => {
    if (err && err.code !== 'ENOENT') {
      return res.status(500).json({ error: 'Error al leer el archivo de datos' });
    }

    const facturas = data ? JSON.parse(data) : [];
    const lastId = facturas.length > 0 ? facturas[facturas.length - 1].id : 0;
    const newId = lastId + 1;

    factura.id = newId;

    facturas.push(factura);

    fs.writeFile(path.join(assetsPath, 'datos.json'), JSON.stringify(facturas, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al guardar la factura' });
      }
      res.status(201).json({ message: 'Factura guardada exitosamente', factura });
    });
  });
});

app.delete('/facturas/:id', (req, res) => {
  const facturaId = parseInt(req.params.id, 10);

  fs.readFile(path.join(assetsPath, 'datos.json'), (err, data) => {
    if (err && err.code !== 'ENOENT') {
      return res.status(500).json({ error: 'Error al leer el archivo de datos' });
    }

    const facturas = data ? JSON.parse(data) : [];
    const facturaIndex = facturas.findIndex(f => f.id === facturaId);

    if (facturaIndex === -1) {
      return res.status(404).json({ error: 'Factura no encontrada' });
    }

    const deletedFactura = facturas.splice(facturaIndex, 1)[0];

    fs.writeFile(path.join(assetsPath, 'datos.json'), JSON.stringify(facturas, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al eliminar la factura' });
      }
      res.status(200).json({ message: 'Factura eliminada exitosamente', factura: deletedFactura });
    });
  });
});


app.post('/impuesto', (req, res) => {
  const impuesto = req.body;

  fs.readFile(path.join(assetsPath, 'impuesto.json'), (err, data) => {
    if (err && err.code !== 'ENOENT') {
      return res.status(500).json({ error: 'Error al leer el archivo de datos' });
    }

    const impuestos = data ? JSON.parse(data) : [];
    const lastId = impuestos.length > 0 ? impuestos[impuestos.length - 1].id : 0;
    const newId = lastId + 1;

    impuesto.id = newId;

    impuestos.push(impuesto);

    fs.writeFile(path.join(assetsPath, 'impuesto.json'), JSON.stringify(impuestos, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al guardar el impuesto' });
      }
      res.status(201).json({ message: 'Impuesto guardado exitosamente', impuesto });
    });
  });
});

app.get('/impuesto', (req, res) => {
  fs.readFile(path.join(assetsPath, 'impuesto.json'), (err, data) => {
    if (err && err.code !== 'ENOENT') {
      return res.status(500).json({ error: 'Error al leer el archivo de datos' });
    }

    const impuestos = data ? JSON.parse(data) : [];
    res.status(200).json(impuestos);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
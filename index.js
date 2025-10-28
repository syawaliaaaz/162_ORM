const express = require('express');
const app = express();
const db = require('./models');

app.use(express.json());

// ✅ CREATE (POST)
app.post('/komik', async (req, res) => {
    try {
        const komik = await db.Komik.create(req.body);
        res.status(201).json({
            message: 'Komik berhasil ditambahkan',
            data: komik
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ READ ALL (GET)
app.get('/komik', async (req, res) => {
    try {
        const semuaKomik = await db.Komik.findAll();
        res.status(200).json(semuaKomik);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ READ ONE (GET by ID)
app.get('/komik/:id', async (req, res) => {
    try {
        const komik = await db.Komik.findByPk(req.params.id);
        if (!komik) {
            return res.status(404).json({ message: 'Komik tidak ditemukan' });
        }
        res.status(200).json(komik);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ UPDATE (PUT)
app.put('/komik/:id', async (req, res) => {
    try {
        const [updated] = await db.Komik.update(req.body, {
            where: { id: req.params.id }
        });

        if (updated) {
            const updatedKomik = await db.Komik.findByPk(req.params.id);
            return res.status(200).json({
                message: 'Komik berhasil diupdate',
                data: updatedKomik
            });
        }
        return res.status(404).json({ message: 'Komik tidak ditemukan' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ DELETE
app.delete('/komik/:id', async (req, res) => {
    try {
        const deleted = await db.Komik.destroy({
            where: { id: req.params.id }
        });

        if (deleted) {
            return res.status(200).json({ message: 'Komik berhasil dihapus' });
        }
        return res.status(404).json({ message: 'Komik tidak ditemukan' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ START SERVER
db.sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('✅ Server berjalan di port 3000');
    });
}).catch((err) => {
    console.error('❌ Koneksi database atau sinkronisasi gagal:', err);
});

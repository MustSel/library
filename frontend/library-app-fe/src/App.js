import React, { useState, useEffect } from 'react';
import { AppBar, CardActions, Toolbar, Typography, Container, Grid, Card, CardContent, CardMedia, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const App = () => {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState({ title: '', author: '', ISBN: '', genre: '', publicationYear: '', image: '' });
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});

  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://myfirstlibrary-backend.vercel.app/');
      setBooks(response.data.result.rows);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!currentBook.title.trim()) newErrors.title = 'Başlık zorunludur';
    if (!currentBook.author.trim()) newErrors.author = 'Yazar zorunludur';
    if (!currentBook.genre.trim()) newErrors.genre = 'Tür zorunludur';
    if (!currentBook.publicationYear.trim()) newErrors.publicationYear = 'Yayın yılı zorunludur';
    if (!currentBook.image.trim()) newErrors.image = 'Resim URL zorunludur';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpen = (book = { title: '', author: '', ISBN: '', genre: '', publicationYear: '', image: '' }) => {
    setCurrentBook(book);
    setIsEdit(!!book.id);
    setErrors({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentBook({ title: '', author: '', ISBN: '', genre: '', publicationYear: '', image: '' });
    setErrors({});
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    try {
      if (isEdit) {
        await axios.put(`https://myfirstlibrary-backend.vercel.app/${currentBook.id}`, currentBook);
      } else {
        await axios.post('https://myfirstlibrary-backend.vercel.app/', currentBook);
      }
      fetchBooks();
      handleClose();
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://myfirstlibrary-backend.vercel.app/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setCurrentBook({ ...currentBook, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Kütüphane Uygulaması
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Button variant="contained" color="primary" onClick={() => handleOpen()} style={{ margin: '20px 0' }}>
          Yeni Kitap Ekle
        </Button>
        <Grid container spacing={4}>
          {books?.map((book) => (
            <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={book.image}
                alt={book.title}
                style={{ objectFit: 'cover' }}
              />
              <CardContent style={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {book.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Yazar: {book.author}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ISBN: {book.ISBN}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Tür: {book.genre}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Yayın Yılı: {book.publicationYear}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton color="primary" onClick={() => handleOpen(book)}>
                  <Edit />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleDelete(book.id)}>
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
          
          ))}
        </Grid>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? 'Kitap Düzenle' : 'Yeni Kitap Ekle'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Başlık"
            fullWidth
            value={currentBook.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            required
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            margin="dense"
            label="Yazar"
            fullWidth
            value={currentBook.author}
            onChange={(e) => handleInputChange('author', e.target.value)}
            required
            error={!!errors.author}
            helperText={errors.author}
          />
          <TextField
            margin="dense"
            label="ISBN"
            fullWidth
            value={currentBook.ISBN}
            onChange={(e) => handleInputChange('ISBN', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Tür"
            fullWidth
            value={currentBook.genre}
            onChange={(e) => handleInputChange('genre', e.target.value)}
            required
            error={!!errors.genre}
            helperText={errors.genre}
          />
          <TextField
            margin="dense"
            label="Yayın Yılı"
            fullWidth
            value={currentBook.publicationYear}
            onChange={(e) => handleInputChange('publicationYear', e.target.value)}
            required
            error={!!errors.publicationYear}
            helperText={errors.publicationYear}
          />
          <TextField
            margin="dense"
            label="Resim URL"
            fullWidth
            value={currentBook.image}
            onChange={(e) => handleInputChange('image', e.target.value)}
            required
            error={!!errors.image}
            helperText={errors.image}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            İptal
          </Button>
          <Button onClick={handleSave} color="primary">
            {isEdit ? 'Güncelle' : 'Kaydet'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;

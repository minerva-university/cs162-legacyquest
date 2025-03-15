import { useDropzone } from 'react-dropzone';
import { useCallback, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, IconButton, Stack } from '@mui/material';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';

export default function FileUpload({ onFileUpload }) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.filter(newfile => !files.some(file => file.name === newfile.name));
      if (newFiles.length > 0) {
      const updatedFiles = [...files, ...acceptedFiles];
      setFiles(updatedFiles);
      if (onFileUpload) {
        onFileUpload(updatedFiles);
      }
    }
  }, [onFileUpload, files]);

  const handleDelete = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    if (onFileUpload) {
      onFileUpload(updatedFiles);
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: {'image/*': [], 'application/pdf': []}
  });

  const getFileIcon = file => {
    if (file.type.startsWith('image/')) {
      return <ImageIcon/>;
    } else if (file.type === 'application/pdf') {
      return <PictureAsPdfIcon/>;
    }
    return <InsertDriveFileIcon/>;
  };
    
  return (
    <Box {...getRootProps()}
      sx={{
        border: "2px dashed #1976d2",
        borderRadius: "10px",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: "#f9f9f9",
        "&:hover": { backgroundColor: "#e3f2fd" },
      }}
    >
      <input {...getInputProps()} />
      <Stack direction='row' spacing={1} sx={{alignItems: 'center', justifyContent: 'center' }}>
        <CloudUploadIcon sx={{ fontSize: 24 }} />
        <Typography sx={{fontSize: 12}}>
          Drag & Drop files here or click to upload (Images and PDFs only).
        </Typography>
      </Stack>

      {files.length > 0 && (
        <Box sx={{
          mt: 2, 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px',
          backgroundColor: '#f5f5f5',
          maxHeight: '200px',
          overflow: 'auto'
        }}>
        <List dense disablePadding>
          {files.map((file, index) => (
            <ListItem key={index} sx={{px: 1, py: 0.5}} dense secondaryAction={
              <IconButton edge='end' aria-label='delete' onClick={(e) => {
                e.stopPropagation();
                handleDelete(index);
              }}>
                <DeleteIcon fontSize='small'/>
              </IconButton>
            }>
              <ListItemIcon sx={{minWidth: '24px', mr: 1}}>
                {getFileIcon(file)}
              </ListItemIcon>
              <ListItemText sx={{maxWidth: '200px'}} primary={<Typography sx={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{file.name}</Typography>}/>
            </ListItem>
          ))}
        </List>
        </Box>
      )}
    </Box>
  )
}
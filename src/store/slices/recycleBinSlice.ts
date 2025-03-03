import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RecycleBinFile {
  id: string;
  name: string;
  type: string;
  size: string;
  deletedDate: string;
  originalLocation: string;
}

interface RecycleBinState {
  files: RecycleBinFile[];
}

const initialState: RecycleBinState = {
  files: [
    {
      id: '1',
      name: 'old_project.zip',
      type: 'application/zip',
      size: '2.4 MB',
      deletedDate: '2025-04-10T14:32:00',
      originalLocation: 'C:\\Projects\\',
    },
    {
      id: '2',
      name: 'presentation_draft.pptx',
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      size: '5.7 MB',
      deletedDate: '2025-04-09T09:15:00',
      originalLocation: 'C:\\Documents\\',
    },
    {
      id: '3',
      name: 'screenshot.png',
      type: 'image/png',
      size: '1.2 MB',
      deletedDate: '2025-04-08T16:45:00',
      originalLocation: 'C:\\Pictures\\',
    },
  ],
};

const recycleBinSlice = createSlice({
  name: 'recycleBin',
  initialState,
  reducers: {
    emptyRecycleBin: (state) => {
      state.files = [];
    },
    restoreFile: (state, action: PayloadAction<string>) => {
      state.files = state.files.filter(file => file.id !== action.payload);
    },
    deleteFile: (state, action: PayloadAction<string>) => {
      state.files = state.files.filter(file => file.id !== action.payload);
    },
  },
});

export const { emptyRecycleBin, restoreFile, deleteFile } = recycleBinSlice.actions;

export default recycleBinSlice.reducer;
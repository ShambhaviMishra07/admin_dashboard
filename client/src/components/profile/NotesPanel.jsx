
import { useState } from 'react';
import {
  Pencil,
  Trash2,
  Check,
  X,
  Plus,
} from 'lucide-react';

import {
  addNote,
  updateNote,
  deleteNote,
} from '../../services/applicationService';

const NotesPanel = ({
  applicationId,
  notes,
  onNotesChange,
}) => {
  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleAdd = async () => {
    if (!newNote.trim()) return;

    setSubmitting(true);

    try {
      const note = await addNote(
        applicationId,
        newNote.trim()
      );

      onNotesChange([...notes, note]);
      setNewNote('');
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (note) => {
    setEditingId(note._id);
    setEditText(note.text);
  };

  const saveEdit = async (noteId) => {
    if (!editText.trim()) return;

    const updated = await updateNote(
      applicationId,
      noteId,
      editText.trim()
    );

    onNotesChange(
      notes.map((n) =>
        n._id === noteId ? updated : n
      )
    );

    setEditingId(null);
  };

  const handleDelete = async (noteId) => {
    await deleteNote(applicationId, noteId);

    onNotesChange(
      notes.filter((n) => n._id !== noteId)
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-border-subtle dark:border-white/10 p-5">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Admin Notes
      </h3>

      {/* Add note */}
      <div className="flex flex-col sm:flex-row gap-2 mb-5">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={(e) =>
            e.key === 'Enter' && handleAdd()
          }
          placeholder="Add a note about this candidate..."
          className="flex-1 px-3 py-2 rounded-lg border border-border-subtle dark:border-white/10 bg-surface-muted dark:bg-white/5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white dark:focus:bg-gray-800 transition"
        />

        <button
          onClick={handleAdd}
          disabled={submitting || !newNote.trim()}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 disabled:opacity-50 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>

      {/* Notes list */}
      <div className="space-y-3">
        {notes.length === 0 && (
          <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">
            No notes yet.
          </p>
        )}

        {[...notes].reverse().map((note) => (
          <div
            key={note._id}
            className="bg-surface-muted dark:bg-white/5 rounded-lg p-3"
          >
            {editingId === note._id ? (
              <div className="flex gap-2">
                <input
                  value={editText}
                  onChange={(e) =>
                    setEditText(e.target.value)
                  }
                  onKeyDown={(e) =>
                    e.key === 'Enter' &&
                    saveEdit(note._id)
                  }
                  className="flex-1 px-2 py-1 rounded border border-border-subtle dark:border-white/10 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                  autoFocus
                />

                <button
                  onClick={() =>
                    saveEdit(note._id)
                  }
                  className="text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 p-1.5 rounded"
                >
                  <Check className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setEditingId(null)}
                  className="text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 p-1.5 rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-200">
                    {note.text}
                  </p>

                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {new Date(
                      note.updatedAt || note.createdAt
                    ).toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => startEdit(note)}
                    className="text-gray-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-500/10 p-1.5 rounded transition-colors"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(note._id)
                    }
                    className="text-gray-400 hover:text-status-rejected hover:bg-red-50 dark:hover:bg-red-500/10 p-1.5 rounded transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesPanel;


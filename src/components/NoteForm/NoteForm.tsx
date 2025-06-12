import type { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../services/noteService';
import type { NoteTag } from '../../types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
}

const tags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Shopping'];

const NoteForm: FC<NoteFormProps> = ({ onClose }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      tag: 'Todo' as NoteTag,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      content: Yup.string().required('Content is required'),
      tag: Yup.mixed<NoteTag>().oneOf(tags).required(),
    }),
    onSubmit: values => {
      mutation.mutate(values);
    },
  });

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title && (
          <div className={css.error}>{formik.errors.title}</div>
        )}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          onChange={formik.handleChange}
          value={formik.values.content}
        />
        {formik.touched.content && formik.errors.content && (
          <div className={css.error}>{formik.errors.content}</div>
        )}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          onChange={formik.handleChange}
          value={formik.values.tag}
        >
          {tags.map(tag => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" onClick={onClose} className={css.cancel}>
          Cancel
        </button>
        <button type="submit" className={css.submit} disabled={mutation.isPending}>
          Create note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
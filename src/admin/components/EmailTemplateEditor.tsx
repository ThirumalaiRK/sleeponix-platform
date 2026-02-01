import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

import { EmailTemplate } from '../adminTypes';

interface EmailTemplateEditorProps {
  isOpen: boolean;
  onClose: () => void;
  template: EmailTemplate | null;
  onSave: (updatedTemplate: EmailTemplate) => void;
}

const EmailTemplateEditor: React.FC<EmailTemplateEditorProps> = ({
  isOpen,
  onClose,
  template,
  onSave,
}) => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (template) {
      setSubject(template.subject);
      setContent(template.content);
    }
  }, [template]);

  const handleSave = () => {
    if (!template) return;

    onSave({
      ...template,
      subject,
      content,
    });
    toast.success('Template saved successfully!');
    onClose();
  };

  if (!isOpen || !template) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl shadow-[0_8px_32px_rgba(201,168,106,0.25)] w-full max-w-2xl p-8 lg:p-10 border border-[#E8DCCB]"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-[#5C4B3A] hover:text-[#C9A86A] transition-colors"
            >
              <FiX size={24} />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif text-[#0F3A2A]">
                Edit Email Template
              </h2>
              <p className="text-[#5C4B3A] mt-2">
                Editing template for:{' '}
                <span className="font-semibold">{template.trigger}</span>
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-[#5C4B3A] mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E2D9CC] rounded-xl focus:ring-2 focus:ring-[#C9A86A] focus:border-[#C9A86A] transition-all duration-300 outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-[#5C4B3A] mb-2"
                >
                  Message
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={10}
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E2D9CC] rounded-xl focus:ring-2 focus:ring-[#C9A86A] focus:border-[#C9A86A] transition-all duration-300 outline-none resize-y"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-3 text-[#5C4B3A] bg-transparent border border-[#C9A86A] rounded-full hover:bg-[#FAF7F2] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="w-full sm:w-auto px-8 py-3 text-white bg-[#145C3A] rounded-full hover:shadow-[0_0_20px_rgba(201,168,106,0.5)] transition-all duration-300"
                >
                  Save Template
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmailTemplateEditor;
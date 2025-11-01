'use client';

import React, { useState } from 'react';
import { Modal } from './Modal';
import { FiAlertCircle } from 'react-icons/fi';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, description: string) => void;
}

// Security: Input validation constants
const MAX_NAME_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 500;
const MIN_NAME_LENGTH = 1;

// Security: Sanitize input by removing potentially dangerous characters
const sanitizeInput = (input: string): string => {
  // Remove control characters and trim whitespace
  return input.replace(/[\x00-\x1F\x7F]/g, '').trim();
};

// Security: Validate project name
const validateProjectName = (name: string): string | null => {
  const sanitized = sanitizeInput(name);
  
  if (!sanitized || sanitized.length < MIN_NAME_LENGTH) {
    return 'Project name is required';
  }
  
  if (sanitized.length > MAX_NAME_LENGTH) {
    return `Project name must be ${MAX_NAME_LENGTH} characters or less`;
  }
  
  // Check for valid characters (alphanumeric, spaces, hyphens, underscores)
  const validNamePattern = /^[a-zA-Z0-9\s\-_]+$/;
  if (!validNamePattern.test(sanitized)) {
    return 'Project name can only contain letters, numbers, spaces, hyphens, and underscores';
  }
  
  return null;
};

// Security: Validate description
const validateDescription = (description: string): string | null => {
  const sanitized = sanitizeInput(description);
  
  if (sanitized.length > MAX_DESCRIPTION_LENGTH) {
    return `Description must be ${MAX_DESCRIPTION_LENGTH} characters or less`;
  }
  
  return null;
};

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);

  const handleClose = () => {
    // Reset form state when closing
    setName('');
    setDescription('');
    setNameError(null);
    setDescriptionError(null);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Security: Validate inputs before submission
    const nameValidationError = validateProjectName(name);
    const descriptionValidationError = validateDescription(description);
    
    setNameError(nameValidationError);
    setDescriptionError(descriptionValidationError);
    
    if (nameValidationError || descriptionValidationError) {
      return;
    }
    
    // Security: Sanitize before passing to parent
    const sanitizedName = sanitizeInput(name);
    const sanitizedDescription = sanitizeInput(description) || 'A new website project';
    
    onSubmit(sanitizedName, sanitizedDescription);
    handleClose();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    
    // Clear error when user starts typing
    if (nameError) {
      setNameError(null);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDescription(value);
    
    // Clear error when user starts typing
    if (descriptionError) {
      setDescriptionError(null);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Project">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="project-name" className="block text-white/90 font-medium mb-2">
            Project Name <span className="text-pink-300">*</span>
          </label>
          <input
            id="project-name"
            type="text"
            value={name}
            onChange={handleNameChange}
            maxLength={MAX_NAME_LENGTH}
            className={`w-full px-4 py-2 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 ${
              nameError 
                ? 'border-red-400 focus:ring-red-400' 
                : 'border-white/20 focus:ring-purple-500'
            }`}
            placeholder="Enter project name"
            autoFocus
            required
            aria-invalid={!!nameError}
            aria-describedby={nameError ? 'name-error' : undefined}
          />
          {nameError && (
            <div id="name-error" className="flex items-center gap-2 mt-2 text-red-300 text-sm" role="alert">
              <FiAlertCircle className="w-4 h-4" />
              <span>{nameError}</span>
            </div>
          )}
          <p className="mt-1 text-xs text-white/60">
            {name.length}/{MAX_NAME_LENGTH} characters
          </p>
        </div>

        <div className="mb-6">
          <label htmlFor="project-description" className="block text-white/90 font-medium mb-2">
            Description
          </label>
          <textarea
            id="project-description"
            value={description}
            onChange={handleDescriptionChange}
            maxLength={MAX_DESCRIPTION_LENGTH}
            rows={3}
            className={`w-full px-4 py-2 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 resize-none ${
              descriptionError 
                ? 'border-red-400 focus:ring-red-400' 
                : 'border-white/20 focus:ring-purple-500'
            }`}
            placeholder="Enter project description (optional)"
            aria-invalid={!!descriptionError}
            aria-describedby={descriptionError ? 'description-error' : undefined}
          />
          {descriptionError && (
            <div id="description-error" className="flex items-center gap-2 mt-2 text-red-300 text-sm" role="alert">
              <FiAlertCircle className="w-4 h-4" />
              <span>{descriptionError}</span>
            </div>
          )}
          <p className="mt-1 text-xs text-white/60">
            {description.length}/{MAX_DESCRIPTION_LENGTH} characters
          </p>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            Create Project
          </button>
        </div>
      </form>
    </Modal>
  );
};

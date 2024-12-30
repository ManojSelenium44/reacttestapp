import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function FormElements() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    interests: [] as string[],
    newsletter: false,
    terms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan'
  ];

  const interestOptions = [
    'Technology', 'Sports', 'Music', 'Art', 'Travel', 'Food', 'Fashion'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.country) {
      newErrors.country = 'Please select a country';
    }

    if (formData.interests.length === 0) {
      newErrors.interests = 'Please select at least one interest';
    }

    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Form submitted successfully!');
    }
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
      {/* Text Input */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          data-testid="username-input"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600" data-testid="username-error">
            {errors.username}
          </p>
        )}
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          data-testid="email-input"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600" data-testid="email-error">
            {errors.email}
          </p>
        )}
      </div>

      {/* Password Input with Toggle */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            data-testid="password-input"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            data-testid="password-toggle"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600" data-testid="password-error">
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          data-testid="confirm-password-input"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600" data-testid="confirm-password-error">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Select Dropdown */}
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          data-testid="country-select"
        >
          <option value="">Select a country</option>
          {countries.map(country => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="mt-1 text-sm text-red-600" data-testid="country-error">
            {errors.country}
          </p>
        )}
      </div>

      {/* Checkboxes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Interests
        </label>
        <div className="space-y-2">
          {interestOptions.map(interest => (
            <label key={interest} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.interests.includes(interest)}
                onChange={() => handleInterestChange(interest)}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                data-testid={`interest-${interest.toLowerCase()}`}
              />
              <span className="ml-2">{interest}</span>
            </label>
          ))}
        </div>
        {errors.interests && (
          <p className="mt-1 text-sm text-red-600" data-testid="interests-error">
            {errors.interests}
          </p>
        )}
      </div>

      {/* Newsletter Toggle */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="newsletter"
          name="newsletter"
          checked={formData.newsletter}
          onChange={(e) => setFormData(prev => ({ ...prev, newsletter: e.target.checked }))}
          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          data-testid="newsletter-checkbox"
        />
        <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
          Subscribe to newsletter
        </label>
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          checked={formData.terms}
          onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.checked }))}
          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          data-testid="terms-checkbox"
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
          I accept the terms and conditions
        </label>
      </div>
      {errors.terms && (
        <p className="mt-1 text-sm text-red-600" data-testid="terms-error">
          {errors.terms}
        </p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        data-testid="submit-button"
      >
        Submit
      </button>
    </form>
  );
}
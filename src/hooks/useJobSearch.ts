import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';

export interface FormData {
    position: string;
    jobType: string;
    location: string;
    email: string;
    skills: string[]; // new
    education: string[]; // new
    experience: string[]; // new
}

export interface FormErrors {
    position?: string;
    jobType?: string;
    location?: string;
    email?: string;
    skills?: string; // limit / validation
    education?: string; // limit / validation
    experience?: string; // limit / validation
}

export interface Suggestion {
    id: string;
    text: string;
    countryCode: string;
}

export const useJobSearch = () => {
    const [formData, setFormData] = useState<FormData>({
        position: '',
        jobType: '',
        location: '',
        email: '',
        skills: [],
        education: [],
        experience: []
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
        position: false,
        jobType: false,
        location: false,
        email: false,
        skills: false,
        education: false,
        experience: false
    });
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const selectedCountryCodeRef = useRef<string>('');

    const TOMTOM_API_KEY = import.meta.env.VITE_TOMTOM_API;
    if (!TOMTOM_API_KEY) {
        console.error('VITE_TOMTOM_API environment variable is not set');
    }

    // Validation rules
    const validateField = (field: keyof FormData, value: any): string | undefined => {
        switch (field) {
            case 'position':
                if (!value.trim()) return 'Job title is required';
                if (value.length < 2) return 'Job title must be at least 2 characters';
                if (value.length > 100) return 'Job title must be less than 100 characters';
                return undefined;

            case 'jobType':
                if (!value) return 'Please select a job type';
                return undefined;

            case 'location':
                if (!value.trim()) return 'Location is required';
                if (value.length < 2) return 'Location must be at least 2 characters';
                if (value.length > 100) return 'Location must be less than 100 characters';
                if (!selectedCountryCodeRef.current) return 'Please select a location from the suggestions';
                return undefined;

            case 'email':
                if (!value.trim()) return 'Email is required';
                // RFC 5322 compliant email regex
                const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!emailRegex.test(value)) return 'Please enter a valid email address';
                return undefined;

            case 'skills':
                if (Array.isArray(value) && value.length > 10) return 'Maximum 10 skills';
                return undefined;
            case 'education':
                if (Array.isArray(value) && value.length > 3) return 'Maximum 3 entries';
                return undefined;
            case 'experience':
                if (Array.isArray(value) && value.length > 3) return 'Maximum 3 entries';
                return undefined;

            default:
                return undefined;
        }
    };

    // Validate all fields
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        (Object.keys(formData) as Array<keyof FormData>).forEach((field) => {
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
                isValid = false;
            }
        });

        setFormErrors(newErrors);
        return isValid;
    };

    // Mark field as touched when it loses focus
    const handleBlur = (field: keyof FormData) => () => {
        setTouched(prev => ({...prev, [field]: true}));

        // Validate the field when it loses focus
        const error = validateField(field, formData[field]);
        setFormErrors(prev => ({
            ...prev,
            [field]: error
        }));
    };

    useEffect(() => {
        // Close suggestions when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Auto-hide the success popup after 5 seconds
    useEffect(() => {
        if (showSuccessPopup) {
            const timer = setTimeout(() => {
                setShowSuccessPopup(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [showSuccessPopup]);

    // Auto-hide the error popup after 5 seconds
    useEffect(() => {
        if (showErrorPopup) {
            const timer = setTimeout(() => {
                setShowErrorPopup(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [showErrorPopup]);

    const fetchSuggestions = async (query: string) => {
        if (!query) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await fetch(
                `https://api.tomtom.com/search/2/search/${encodeURIComponent(query)}.json?` +
                `key=${TOMTOM_API_KEY}` +
                `&typeahead=true` +
                `&limit=4` +
                `&language=en-US` +
                `&entityType=Municipality,Country`
            );

            if (!response.ok) throw new Error('Failed to fetch suggestions');

            const data = await response.json();
            const formattedSuggestions = data.results
                .filter((result: any) => result.address && result.address.municipality) // Ensure we have valid city data
                .map((result: any) => {
                    // Construct a readable address string
                    const municipality = result.address.municipality;
                    const country = result.address.country;

                    let text = municipality;
                    if (country) {
                        text += `, ${country}`;
                    }

                    return {
                        id: result.id,
                        text: text,
                        countryCode: result.address.countryCode ?? ''
                    };
                })
                .filter((suggestion: Suggestion, index: number, self: Suggestion[]) =>
                    // Remove duplicates
                    index === self.findIndex((s) => s.text === suggestion.text)
                );

            setSuggestions(formattedSuggestions);
            setShowSuggestions(true);
        } catch (err) {
            console.error('Error fetching suggestions:', err);
            setSuggestions([]);
        }
    };

    // Debounce function to limit API calls
    const debounce = (func: Function, wait: number) => {
        let timeout: ReturnType<typeof setTimeout>;
        return (...args: any[]) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

    const handleLocationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Prevent input if it's only numbers
        if (/^\d+$/.test(value) && value.length > 0) {
            // Update error but don't update the field value
            setFormErrors(prev => ({
                ...prev,
                location: 'Location cannot contain only numbers'
            }));
            return;
        }

        setFormData(prev => ({...prev, location: value}));
        selectedCountryCodeRef.current = '';

        // Clear error if field is valid
        const error = validateField('location', value);
        setFormErrors(prev => ({
            ...prev,
            location: touched.location ? error : undefined
        }));

        debouncedFetchSuggestions(value);
    };

    const handleSuggestionClick = (suggestion: Suggestion) => {
        setFormData(prev => ({...prev, location: suggestion.text}));
        selectedCountryCodeRef.current = suggestion.countryCode;
        setShowSuggestions(false);

        // Clear location error when selecting a valid suggestion
        setFormErrors(prev => ({
            ...prev,
            location: undefined
        }));

        // Mark as touched
        setTouched(prev => ({...prev, location: true}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Mark all fields as touched
        setTouched({
            position: true,
            jobType: true,
            location: true,
            email: true,
            skills: true,
            education: true,
            experience: true
        });

        // Validate all fields before submission
        if (!validateForm()) {
            return; // Don't submit if validation fails
        }

        setIsSubmitting(true);
        setError(null);
        setSuccess(null);
        setShowSuccessPopup(false);
        setShowErrorPopup(false);

        try {
            const response = await fetch('https://api.yourjobfinder.website/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    countryCode: selectedCountryCodeRef.current
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit job search, please try again.');
            }

            setSuccess('Thank you! We will start searching for jobs matching your criteria.');
            setShowSuccessPopup(true);

            // Reset form
            setFormData({
                position: '',
                jobType: '',
                location: '',
                email: '',
                skills: [],
                education: [],
                experience: []
            });
            setFormErrors({});
            setTouched({
                position: false,
                jobType: false,
                location: false,
                email: false,
                skills: false,
                education: false,
                experience: false
            });
        } catch (err) {
            console.error(err);
            setError('An unexpected error occurred, please try again.');
            setShowErrorPopup(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field: keyof FormData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const value = e.target.value;

        // Special validation for position field to prevent numbers-only input
        if (field === 'position' && /^\d+$/.test(value) && value.length > 0) {
            // Update error but don't update the field value
            setFormErrors(prev => ({
                ...prev,
                position: 'Job title cannot contain only numbers'
            }));
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // Validate on change if the field has been touched
        if (touched[field]) {
            const error = validateField(field, value);
            setFormErrors(prev => ({
                ...prev,
                [field]: error
            }));
        }
    };

    const addSkill = (raw: string) => {
        const skill = raw.trim();
        if (!skill) return;
        setFormData(prev => {
            if (prev.skills.length >= 10 || prev.skills.some(s => s.toLowerCase() === skill.toLowerCase())) return prev;
            return {...prev, skills: [...prev.skills, skill]};
        });
        setFormErrors(prev => ({...prev, skills: undefined}));
    };

    const removeSkill = (skill: string) => {
        setFormData(prev => ({...prev, skills: prev.skills.filter(s => s !== skill)}));
    };

    const addEducation = (raw: string) => {
        const entry = raw.trim();
        if (!entry) return;
        setFormData(prev => {
            if (prev.education.length >= 3 || prev.education.some(e => e.toLowerCase() === entry.toLowerCase())) return prev;
            return {...prev, education: [...prev.education, entry]};
        });
        setFormErrors(prev => ({...prev, education: undefined}));
    };

    const removeEducation = (entry: string) => {
        setFormData(prev => ({...prev, education: prev.education.filter(e => e !== entry)}));
    };

    const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (['Enter', 'Tab', ','].includes(e.key)) {
            e.preventDefault();
            const target = e.target as HTMLInputElement;
            addSkill(target.value);
            target.value = '';
        } else if (e.key === 'Backspace') {
            const target = e.target as HTMLInputElement;
            if (!target.value && formData.skills.length) {
                removeSkill(formData.skills[formData.skills.length - 1]);
            }
        }
    };

    const handleEducationKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (['Enter', 'Tab'].includes(e.key)) {
            e.preventDefault();
            const target = e.target as HTMLInputElement;
            addEducation(target.value);
            target.value = '';
        } else if (e.key === 'Backspace') {
            const target = e.target as HTMLInputElement;
            if (!target.value && formData.education.length) {
                removeEducation(formData.education[formData.education.length - 1]);
            }
        }
    };

    const addExperience = (raw: string) => {
        const entry = raw.trim();
        if (!entry) return;
        setFormData(prev => {
            if (prev.experience.length >= 3 || prev.experience.some(e => e.toLowerCase() === entry.toLowerCase())) return prev;
            return {...prev, experience: [...prev.experience, entry]};
        });
        setFormErrors(prev => ({...prev, experience: undefined}));
    };

    const removeExperience = (entry: string) => {
        setFormData(prev => ({...prev, experience: prev.experience.filter(e => e !== entry)}));
    };

    const handleExperienceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (['Enter', 'Tab'].includes(e.key)) {
            e.preventDefault();
            const target = e.target as HTMLInputElement;
            addExperience(target.value);
            target.value = '';
        } else if (e.key === 'Backspace') {
            const target = e.target as HTMLInputElement;
            if (!target.value && formData.experience.length) {
                removeExperience(formData.experience[formData.experience.length - 1]);
            }
        }
    };

    return {
        formData,
        formErrors,
        isSubmitting,
        error,
        success,
        showSuccessPopup,
        setShowSuccessPopup,
        showErrorPopup,
        setShowErrorPopup,
        suggestions,
        showSuggestions,
        suggestionsRef,
        navigate,
        handleLocationInput,
        handleSuggestionClick,
        handleSubmit,
        handleInputChange,
        handleBlur,
        touched,
        addSkill,
        removeSkill,
        addEducation,
        removeEducation,
        handleSkillKeyDown,
        handleEducationKeyDown,
        addExperience,
        removeExperience,
        handleExperienceKeyDown
    };
};

import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline';

interface Option {
    value: string | number;
    label: string;
}

interface SelectProps {
    value: string | number | null;
    onChange: (value: any) => void;
    options: Option[];
    label?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
    value,
    onChange,
    options,
    label,
    placeholder = 'Выберите...',
    className = '',
    disabled = false
}) => {
    const selectedOption = options.find(opt => opt.value === value);

    const labelStyle = "text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.1em] mb-2 block";

    return (
        <div className={`flex flex-col ${className}`}>
            {label && <label className={labelStyle}>{label}</label>}
            <Listbox value={value} onChange={onChange} disabled={disabled}>
                <div className="relative">
                    <Listbox.Button className={`
                        relative w-full cursor-pointer rounded-xl bg-[var(--input-bg)] py-2.5 pl-4 pr-10 text-left border border-[var(--input-border)]
                        focus:outline-none focus-visible:border-[var(--primary)] focus-visible:ring-4 focus-visible:ring-purple-500/10
                        sm:text-sm transition-all
                        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-[var(--primary)]'}
                    `}>
                        <span className={`block truncate ${!selectedOption ? 'text-[var(--input-placeholder)]' : 'text-[var(--text)]'}`}>
                            {selectedOption ? selectedOption.label : placeholder}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <ChevronDownIcon
                                className="h-4 w-4 text-[var(--text-muted)]"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-[var(--surface)] py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50 border border-[var(--border)]">
                            {options.map((option, optionIdx) => (
                                <Listbox.Option
                                    key={optionIdx}
                                    className={({ active }) =>
                                        `relative cursor-pointer select-none py-2.5 pl-10 pr-4 transition-colors ${active ? 'bg-[var(--primary)] text-white' : 'text-[var(--text)]'
                                        }`
                                    }
                                    value={option.value}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-bold' : 'font-normal'
                                                    }`}
                                            >
                                                {option.label}
                                            </span>
                                            {selected ? (
                                                <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-[var(--primary)]'}`}>
                                                    <CheckIcon className="h-4 w-4" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
};

export default Select;

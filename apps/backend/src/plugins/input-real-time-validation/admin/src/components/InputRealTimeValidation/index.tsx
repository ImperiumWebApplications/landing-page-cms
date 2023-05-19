import React, { useState, useEffect } from 'react';
import { TextInput, ProgressBar, Box } from '@strapi/design-system';

type RealTiemeValidationInputPluginProps = {
    value: string;
    onChange: (event: any) => void;
    intlLabel: {
        id: string;
        defaultMessage: string;
    };
    name: string;

    attribute: {
        options: {
            maxLength: number;
        }
    }
    error: string;
}

const RealTiemeValidationInputPlugin: React.FC<RealTiemeValidationInputPluginProps> = ({ onChange, value, name, attribute }) => {
    const [error, setError] = useState("");

    const handleOnChange = (e: any) => {
        const inputValue = e.target.value;
        if (inputValue.length > attribute.options.maxLength) {
            setError(`Input value exceeds ${attribute.options.maxLength} characters!`);
        } else {
            setError("");
            onChange({ target: { name: name, value: inputValue } });
        }
    };

    useEffect(() => {
        if (error.length > 0) {
            onChange({ target: { name: name, value: value } });
        }
    }, [error]);

    const progress = (value?.length / attribute.options.maxLength) * 100;

    return (
        <>
            <TextInput
                type="text"
                label={name}
                value={value}
                onChange={handleOnChange}
                error={error.length > 0 && error}
            />
            <ProgressBar
                variant="linear"
                value={progress}
                style={{ width: "100%" }}
            />
        </>
    );
};

export default RealTiemeValidationInputPlugin;

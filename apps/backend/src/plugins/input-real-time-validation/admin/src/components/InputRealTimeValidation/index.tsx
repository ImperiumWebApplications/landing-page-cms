import React, { useState } from 'react';
import { TextInput } from '@strapi/design-system';

type MyPluginInputValidationProps = {
    value: string;
    onChange: (event: any) => void;
    intlLabel: {
        id: string;
        defaultMessage: string;
    };
    name: string;

}

const MyPluginInputValidation: React.FC<MyPluginInputValidationProps> = ({ onChange, value, name }) => {
    const [error, setError] = useState("");

    const handleOnChange = (e: any) => {
        const inputValue = e.target.value;
        if (inputValue.length > 150) {
            setError("Input value exceeds 150 characters!");
        } else {
            setError("");
            onChange({ target: { name: 'yourInputFieldName', value: inputValue } });
        }
    };


    return (

        <>
            <TextInput
                type="text"
                label={name}
                value={value}
                onChange={handleOnChange}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>

    );
};

export default MyPluginInputValidation;

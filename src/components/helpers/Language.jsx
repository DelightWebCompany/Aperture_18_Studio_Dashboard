import React, { useContext } from 'react'
import { Dropdown } from "react-bootstrap";
import { LanguageContext } from '../../contexts/LanguageContext';

export default function Language() {
    const { lan, updateLanguage } = useContext(LanguageContext);

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle
                    variant="light"
                    id="dropdown-basic"
                >
                    {lan === "mm" ? "မြန်မာ" : lan === "ta" ? "தமிழ்" : "EN"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={() => updateLanguage("en")}
                    >
                        EN
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => updateLanguage("mm")}
                    >
                        မြန်မာ
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => updateLanguage("ta")}
                    >
                        தமிழ்
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

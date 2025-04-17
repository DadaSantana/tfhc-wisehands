import { colors } from "@/styles/colors";
import React, { useContext } from "react";

import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";

const ButtonContext = React.createContext({ isActive: false });

type ButtonProps = TouchableOpacityProps & {
    children: string;
    isActive?: boolean;
};

type ButtonTextProps = {
    children: React.ReactNode;
}

type ButtonIconProps = {
    children: React.ReactNode;
}

function Button({ children, isActive = false, ...rest }: ButtonProps) {
    return (
        <ButtonContext.Provider value={{ isActive }}>
            <OperationButton isActive={isActive} {...rest}>
                {children}
            </OperationButton>
        </ButtonContext.Provider>
    );

}

function ButtonText({ children, ...rest }: ButtonProps) {
    const { isActive } = useContext(ButtonContext);

    return (
        <OperationBtnText isActive={isActive} {...rest}>
            {children}
        </OperationBtnText>
    );

}

function ButtonIcon({ children, ...rest }: ButtonIconProps) {
    const { isActive } = useContext(ButtonContext);
    console.log("ButtonIcon: isActive: ", isActive)
    return (
        <OperationBtnIcon isActive={isActive} {...rest}>
            {children}
        </OperationBtnIcon>
    );
}

Button.Text = ButtonText;
Button.Icon = ButtonIcon;

export { Button };


const OperationButton = styled.TouchableOpacity<ButtonProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    /* padding: 12px 30px; */
    background-color: ${props => props.isActive ? `${colors.yellow}` : '#232831'};
    border-radius: 4px;
    /* width: 29%; */
    align-items: center;
    margin-top: 10px;
    gap: 8px;
    height: 40px;
`;

const OperationBtnText = styled.Text<ButtonTextProps>`
    color: ${props => props.isActive ? '#0d0e12' : '#E8E8E9'};
    font-size: 16px;
    font-weight: 600;
`;

const OperationBtnIcon = styled.Text<ButtonIconProps>`
    color: ${props => props.isActive ? '#0d0e12' : '#E8E8E9'};
`;
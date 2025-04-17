import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/font-family";
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

function ScrollViewButton({ children, isActive = false, ...rest }: ButtonProps) {
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

ScrollViewButton.Text = ButtonText;
ScrollViewButton.Icon = ButtonIcon;

export { ScrollViewButton };


const OperationButton = styled.TouchableOpacity<ButtonProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${(props: ButtonTextProps & { isActive: boolean }) => props.isActive ? `${colors.yellow}` : colors.white.default};
    border-radius: 14px;
    align-items: center;
    gap: 8px;
    /* Sombras para iOS */
    shadow-color: rgba(0, 0, 0, 0.25);
    shadow-offset: 0px 0.815px;
    shadow-opacity: 0.25;
    shadow-radius: 6.52px;
    /* Sombras para Android */
    elevation: 6;
`;

const OperationBtnText = styled.Text<ButtonTextProps>`
    color: ${(props: ButtonTextProps & { isActive: boolean }) => props.isActive ? colors.green.light : colors.gray[500]};
    font-size: 16px;
    font-weight: 600;
    font-family: ${fontFamily.bold};
    padding-right: 16px;
    padding-left: 16px;
    padding-top: 10px;
    padding-bottom: 10px;
`;

const OperationBtnIcon = styled.Text<ButtonIconProps>`
    color: ${(props: ButtonIconProps & { isActive: boolean }) => props.isActive ? '#0d0e12' : '#E8E8E9'};
`;
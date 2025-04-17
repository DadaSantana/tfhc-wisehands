import {
    Text,
    TextProps,
    TouchableOpacity,
    TouchableOpacityProps,
    ActivityIndicator
} from 'react-native';

import { FontAwesomeIcon, Props as FontAwesomeIconProps } from '@fortawesome/react-native-fontawesome';


import { s } from './styles';
import { colors } from '@/styles/theme';

type ButtonProps = TouchableOpacityProps & {
    isLoading?: boolean;
}

function Button({ children, style, isLoading = false, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity
            style={[s.container, style]}
            disabled={isLoading}
            {...rest}
        >
            {isLoading ? (
                <ActivityIndicator
                    size="small"
                    color={colors.green}
                />
            ) : children}
        </TouchableOpacity>
    );
}

function Title({ children }: TextProps) {
    return (
        <Text style={s.title}>
            {children}
        </Text>
    );
}


function Icon({ icon, ...props }: FontAwesomeIconProps) {
    return <FontAwesomeIcon icon={icon}  {...props} />;
}

Button.Title = Title;
Button.Icon = Icon;

export { Button };
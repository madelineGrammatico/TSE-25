import { ColorValues, theme } from "@/theme/theme"
import { IconName } from "@/types/Category"
import { getCategoryIcon } from "@/utils/icon"
import styled from "styled-components"

type BadgeLabelSelectProps = {
    iconName?: IconName,
    label?: string,
    color: ColorValues,
    iconSize?: string,
}

export const BadgeLabelSelect = ({
    iconName, 
    label, 
    color, 
    iconSize = theme.fonts.size.SM 
}: BadgeLabelSelectProps) => {
    const IconToDisplay = iconName? getCategoryIcon(iconName): undefined

    return(
        <LabelStyled color={color}>
            {IconToDisplay && <IconToDisplay height={iconSize} width={iconSize}/>}
            {label && <span className="label">{label}</span>}
        </LabelStyled>
    )
}

type LabelStyledProps = {
    color: ColorValues
}
const LabelStyled = styled.span<LabelStyledProps>`
    display: flex;
        align-items: center;
        line-height: 1;
        gap: ${theme.spacing.xs};
        
        font-weight: ${theme.fonts.weights.regular};
        font-size: ${theme.fonts.size.SM};
        color: ${({color})=> color};
`;
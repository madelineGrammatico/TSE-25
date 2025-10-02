import { ColorValues, theme } from "@/theme/theme"
import { IconName } from "@/types/Category"
import { getCategoryIcon } from "@/utils/icon"
import styled from "styled-components"

type BadgeLabelSelectProps = {iconName: IconName,
    label: string,
    color: ColorValues

}
export const BadgeLabelSelect = ({iconName, label, color}: BadgeLabelSelectProps) => {
    const IconToDisplay = getCategoryIcon(iconName)
    return(
        <LabelStyled color={color}>
            {IconToDisplay&&<IconToDisplay height={theme.fonts.size.SM} width={theme.fonts.size.SM}/>}
            <span className="label">{label}</span>
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
import { theme, ColorValues,  } from "@/theme/theme";
import { applyOpacity, getBgColorToApply } from "@/utils/color";
import { GroupBase, StylesConfig } from "react-select";

export const getColourStyle  = <Data extends {color: ColorValues}> ():StylesConfig<Data, true, GroupBase<Data>>  => {
    const colourStyle: StylesConfig<Data, true, GroupBase<Data>> = {
        control: (styles) => ({
            ...styles,
            backgroundColor: theme.colors.background_white,
            border: "none",
            color:theme.colors.greyBlue,
            paddingLeft: "23px",
        }),
        option: (styles, { data, isDisabled, isSelected}) => {
            return {
                ...styles,
                display: "flex",
                justifyContent: "center",
                alignItems:"center",
                backgroundColor: "transparent",
                borderRadius: theme.borderRadius.badgeRound,
                color: data.color,
                cursor: isDisabled ? 'not-allowed' : 'default',
                width: "fit-content",
                padding: `${theme.spacing.xmd} ${theme.spacing.sm}`,
                height: theme.spacing.lg,
                fontWeight: theme.fonts.weights.regular,
                fontSize: theme.fonts.size.P0,
                margin:"0",
                ':hover': {
                    cursor:"pointer",
                    backgroundColor: getBgColorToApply({color: data.color}, isSelected, true),
                },
                ':active': {
                    ...styles[':active'],
                    backgroundColor: getBgColorToApply({color: data.color}, isSelected, true),
                }
            }
        },
        
        menu: (styles) => ({
                ...styles,
                backgroundColor: theme.colors.white,
                position: "absolute",
                height:"fit-content",
                top:"inherit",
                bottom: "100%",
                padding:`${theme.spacing.sm} ${theme.spacing.xs}`,
            })
        ,
        menuList: (styles) => ({
                ...styles,
                padding:"0",
                margin:"0",
                display:"flex",
                flexDirection:"column",
                justifyContent:"start",
                alignItems: "start",
                gap: theme.spacing.xs,
            })
        ,
        groupHeading:(styles) => ({
            ...styles,
            display: "none",
        }),
        multiValue: (styles, { data }) => {
            return {
                ...styles,
                borderRadius: theme.borderRadius.badgeRound,
                border:`1px solid ${data.color}`,
                backgroundColor:  applyOpacity(data.color, 0.1),
                padding: `${theme.spacing.xs}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: theme.spacing.xxs,

                height: theme.spacing.lg,
            };
        },
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            border:`1px solid ${data.color}`,
            borderRadius: theme.borderRadius.badgeRound,
            backgroundColor: data.color,
            color: theme.colors.white,
            height: theme.fonts.size.SM,
            width: theme.fonts.size.SM,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            ':hover': {
                backgroundColor: "transparent",
                color: data.color,
                cursor:"pointer",
            },
        }),
        clearIndicator:(styles) => ({
            ...styles,
            cursor:"pointer",
        }),
        indicatorSeparator: (styles) => ({
            ...styles,
            display: "none"
        }),
        dropdownIndicator: (styles) => ({
            ...styles,
            display: "none"
        }),
    }
    return colourStyle
}
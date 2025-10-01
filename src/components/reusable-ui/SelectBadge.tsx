import { useOrderContext } from "@/context/OrderContext"
import { Category, IconName } from "@/types/Category"
import  Select, { ControlProps, GroupBase, GroupProps, StylesConfig }from "react-select"
import { Chip } from "./Chip"
import { applyOpacity, getBgColorToApply } from "@/utils/color"

import { ColorValues, theme } from "@/theme/theme"
import { ComponentPropsWithoutRef } from "react"
import styled from "styled-components"
import { getCategoryIcon } from "@/utils/icon"


type OptionType = Category & {
    value: string,
    label: string
}
type SelectBadgeProps= {
    Icon: React.ReactNode,
    version?: "minimalist",
    placeholder?:string,
    classname:string,

}   & Partial<ComponentPropsWithoutRef<"select">>
    & Omit<ComponentPropsWithoutRef<"select">, "defaultValue"| "value" |"id">

export const SelectBadge = ({ placeholder, Icon, classname}: SelectBadgeProps) => {
    const {categories} = useOrderContext()
    const options = categories.map((category)=>(
        {
            ...category,
             value: category.value || "" ,
             label: category.label || "" 
        }

    ))
    const groupedOption = [{ 
        label: placeholder,
        options: options

    }]
    
    const formatGroupLabel = (group: GroupBase<OptionType>) => {return []}
    //   { return group.options.map((option)=>(
    //     <Chip key={option.id} {...option} className="chip" />
    //  ))}
    //  <Chip key={group.options.length} {...group.options} className="chip" />
    

    const colourStyle: StylesConfig<OptionType, true, GroupBase<OptionType> > = {
        control: (styles) => ({
            ...styles,
            backgroundColor: theme.colors.background_white,
            border: "none",
            color:theme.colors.greyBlue,
        }),
        option: (styles, { data, isDisabled, isSelected, isFocused}) => {
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
                },
                ':active': {
                    ...styles[':active'],
                    backgroundColor: getBgColorToApply({color: data.color}, isSelected, isFocused),
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
                padding:`0 ${theme.spacing.xs}`,
                
                
            })
        ,
        menuList: (styles) => ({
                ...styles,
                padding:"0",
                margin:"0",
                display:"flex",
                justifyContent:"start",
                alignItems: "start",
                gap: theme.spacing.xl,
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
                padding: `
                    ${theme.spacing.xs} 
                    ${theme.spacing.xs} 
                    ${theme.spacing.xs} 
                    ${theme.spacing.sm}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: theme.spacing.xxs,

                height: theme.spacing.lg,
            };
        },
        // multiValueLabel: (styles) => ({
        //     ...styles,
        //     display: "flex",
        //     alignItems: "center",
        //     lineHeight: 1,
        // }),
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
    const Group = (props: GroupProps) => (
        <div style={groupStyles}>
            <components.Group {...props} />
        </div>
    );
   
    return <Select<OptionType, true, GroupBase<OptionType>>
        options={groupedOption}
        isMulti={true}
        closeMenuOnSelect={false}
        formatGroupLabel={formatGroupLabel}
        defaultValue={options}
        styles={colourStyle}
        placeholder={placeholder}
        filterOption={()=> true}
        components={{
            MultiValueLabel: ({data})=> (
                // <Chip 
                // {...props.data}
                // className={classname}
                // />
                <BadgeLabel iconName={data.iconName} label={data.label} color={data.color}/>
            ),
       
        }}
    />
}


export const BadgeLabel = ({iconName, label, color}:{iconName: IconName, label: string, color: ColorValues}) => {
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
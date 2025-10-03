import { components, GroupBase, MultiValueGenericProps, OptionProps } from "react-select"
import { BadgeLabelSelect } from "@/components/pages/order/Main/MainLeftSide/Admin/AdminPanel/Form/MultiSelect/BadgeLabelSelect";
import { OptionMustHave } from "@/components/reusable-ui/MultiSelect/MultiSelect";
import { IconName } from "@/types/Category";


type TOption <T extends OptionMustHave> = T 

export const CustomMultiValueLabel = <T extends OptionMustHave> (
    props: MultiValueGenericProps<
        TOption<T>, 
        true, 
        GroupBase<TOption<T>>
    >
) => {
  return (
    <components.MultiValueLabel {...props}>
      <BadgeLabelSelect 
        iconName={props.data.icomName} 
        label={props.data.label} 
        color={props.data.color}
      />
    </components.MultiValueLabel>
  )
}

type CustomOptionProps <T extends OptionMustHave> = 
    OptionProps<
        TOption<T>, 
        true, 
        GroupBase<TOption<T>>
    > 

type withIconName = {iconName: IconName}
function hasIconName <T> (data: T): data is T & withIconName {
    return typeof data === "object" && data !== null && "iconName" in data
}
type WithLabel = {label: string}
function hasLabel <T> (data: T): data is T & WithLabel {
    return typeof data === "object" && data !== null && "label" in data
}

export const CustomOption = <T extends OptionMustHave> (
    props: CustomOptionProps<T>
    
) => { 
    const { data } = props
    return (
    <components.Option {...props}>
         <BadgeLabelSelect 
           iconName={hasIconName(data)? data.iconName : undefined }
            label={hasLabel(data)? data.label : "erreur"} 
            color={data.color}
        />
    </components.Option>
)}

// type CustomControl <T extends OptionMustHave> = 
//     ControlProps<
//         TOption<T>, 
//         true, 
//         GroupBase<TOption<T>>
//     > 
//     // & {
//     //     Icon: React.ReactNode
//     // }

// export const CustomControl = <T extends OptionMustHave> (
//     props: CustomControl<T>
// ) => {
//     const { children, selectProps} = props
//     const {Icon} = selectProps
//     return (
//     <components.Control {...props}>
//         {Icon}
//         {children}
//     </components.Control>
// )}

 
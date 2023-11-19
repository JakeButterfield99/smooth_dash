import { BgOptionProps } from '../../services/backgrounds';

const BackgroundOption = (props: BgOptionProps) => {

    const BgPressed = () => {
        props.onPress();
    }

    return (
        <div className={`bg-option active-${props.active}`} onClick={BgPressed}>
            <p className='flag'>
                {props.flag}
            </p>
            <p className='text'>
                {props.text}
            </p>
        </div>
    )
}
export default BackgroundOption;
import MomentButton from "../interface/MomentButton"



//TO DO: Attach what to do when clicked here
async function callResetBackend() {

}

function ResetButton() {
    return (
        <MomentButton 
        label="Reset" 
        onTrigger={callResetBackend} 
        />
    );
};

export default ResetButton
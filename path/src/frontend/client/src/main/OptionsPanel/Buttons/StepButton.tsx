import MomentButton from "../interface/MomentButton"


//TO DO: Attach what to do when clicked here
async function callStepBackend() {

}

function StepButton() {   
    return (
        <MomentButton
        label="Step" 
        onTrigger={callStepBackend} 
        />
    );
};

export default StepButton
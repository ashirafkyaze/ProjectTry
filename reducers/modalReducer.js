export default function reducer(
    state={
        openModal: false,
        closeModal:false
    },
action
) {
    switch(action.type){
        case "MODAL_OPEN": {
            return { ...state, openModal: true,closeModal:false };
            
          }
          
          case "MODAL_CLOSE": {
            return { ...state, closeModal: true,openModal:false };
            
          }

          default: {
            return state;
          }
    }
}
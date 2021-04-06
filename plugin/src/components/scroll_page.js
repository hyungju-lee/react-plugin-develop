import '../scss/scroll_page.scss';
import '../js/scroll_plugin';
// import '../js/scroll_plugin1';

function Scroll() {
    return (
        <div className="wrap">
            <div id="scroll-interaction-0" className="scroll-interaction">
                <div className="fixed-element">
                    <div id="txt-0" className="txt">첫번째 텍스트</div>
                </div>
            </div>
        </div>
    )
}

export default Scroll;
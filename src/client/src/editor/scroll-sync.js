import ReactDOM from 'react-dom';

class ScrollRef {
    constructor(id, reactRef) {
        this.id = id;
        this.reactRef = reactRef;
        this.active = false;
    }
}

export default class ScrollSync {

    constructor(...reactRefs) {
        this.id = Math.random();
        this.panels = {};

        reactRefs.forEach((reactRef,i) => {
            this.panels[i] = new ScrollRef(i, reactRef);
        });
    }

    setActive = (ref) => {
        for (const refId in this.panels) {
            if (!this.panels.hasOwnProperty(refId)) 
                continue;

            this.panels[refId].active = ref === this.panels[refId].reactRef ? true : false;
        }
    }

    onPanelScroll = (event) => {
        let scrollTargetNode = event.target;
        let scrollRef = null;
        
        let nodes = {};
        for (const refId in this.panels) {
            if (!this.panels.hasOwnProperty(refId)) 
            continue;
            
            nodes[refId] = ReactDOM.findDOMNode(this.panels[refId].reactRef.current);
            if (nodes[refId] === scrollTargetNode) {
                scrollRef = refId;
            }
        }


        if (scrollRef === null)
            return;

        var pos = scrollTargetNode.scrollTop;
        var ratio = pos / scrollTargetNode.scrollHeight;

        for (const node in nodes) {
            if (!nodes.hasOwnProperty(node))
                continue;

            if (scrollTargetNode !== nodes[node] && this.panels[scrollRef] && this.panels[scrollRef].active) {
                this.updateScroll(nodes[node], ratio);
            }
        }
    }

    updateScroll = (el, ratio) => {
        setTimeout(() => {
            el.scrollTop = Math.round(el.scrollHeight * ratio);
        });
    }
}

const styleContainer = document.querySelector(".style");
const styleEditable = document.querySelector(".style__editable");
const button = document.querySelector(".button");
let renderElementsCount = 0;

styleEditable.style.display = "none";

function changeElementsPosition() {
    const highlightedElement = document.querySelector(".highlighted");
    const isElementHighlighted = highlightedElement;
    if (isElementHighlighted) {
        const highlightedElementStyles = getComputedStyle(highlightedElement);
        const highlightedElementPosition = highlightedElementStyles.position;

        if (highlightedElementPosition !== "absolute") {
            highlightedElement.style.position = "absolute";
        } else {
            highlightedElement.style.position = "static";
        }
    }
}

function getAllH1AndImgElements() {
    button.addEventListener("click", changeElementsPosition);
    const h1AndImgElementsInPage = document.querySelectorAll(
        "body h1, body img:not(img[alt^='Starbuzz'])"
    );

    return h1AndImgElementsInPage;
}

function getRelativeElements() {
    return document.querySelectorAll("#main, #sidebar");
}

function generateUniqueStringId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2); 
}

function createInputElement({type,stringId, label}) {
        const input = document.createElement("input");
        input.type = "radio";
        input.id = stringId;
        input.name = label;

        return input;
}

function createLabelElement(stringId, element) {
        const labelElement = document.createElement("label");
        labelElement.for = stringId;
        labelElement.innerHTML = `${element.nodeName} - ${++renderElementsCount}`;

        return labelElement;
}

function createInputElementsFor({type, elements, label, container}) {
    elements.forEach((e) => {
        const uniqueIdString = generateUniqueStringId();


        const inputElement = createInputElement({
            type: "radio",
            stringId: uniqueIdString,
            label: label
        })

        const labelElement = createLabelElement(uniqueIdString, e);

        labelElement.appendChild(inputElement);

        container.appendChild(labelElement);

        if (type === "absolute") {
            inputElement.addEventListener("click", function () {
                styleEditable.style.display = "block";

                elements.forEach((e) => {
                    e.classList.remove("highlighted");
                    e.style.position = "static";
                });

                e.classList.add("highlighted");
                styleEditable.innerHTML = `${e.nodeName.toLowerCase()}.${
                    e.className
                }{\n\n}`;
            });
        } else {
            labelElement.style.color = "green";
            labelElement.style.fontWeight = "bold";
            inputElement.addEventListener("click", function () {
                elements.forEach((e) => {
                    e.classList.remove("highlighted-relative");
                    e.style.position = "static";
                });

                e.classList.add("highlighted-relative");

                e.style.position = "relative";
            });
        }
    });
}

function main() {
    const positionToggleElements = getAllH1AndImgElements();
    const relativePositionElements = getRelativeElements();

    const inputsContainerElement = document.createElement("div");

    inputsContainerElement.classList.add("inputs-container");
    inputsContainerElement.classList.add("style__item");

    createInputElementsFor({
        type: "relative",
        elements: relativePositionElements,
        label: "relative-elements",
        container: inputsContainerElement
    })

    createInputElementsFor({
        type: "absolute",
        elements: positionToggleElements,
        label: "absolute-elements",
        container: inputsContainerElement
    })

    styleContainer.appendChild(inputsContainerElement);
}

main();

import { withAlert } from "react-alert";
import React, { Component } from "react";
import PropTypes from "prop-types";
import classes from "./Basic-Info.module.scss";
import { Ui } from "../../Ui-Components/Ui-Components";

var uniqid = require("uniqid");

class BasicInfo extends Component {
  static propTypes = {
    setRecipeInfo: PropTypes.func.isRequired,
    recipeInfo: PropTypes.object.isRequired,
    setTagsForRecipe: PropTypes.func.isRequired,
    removeTag: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = { tag: "", validationErrorMessage: { title: false } };
    this.enterIcon = React.createRef();
  }
  setRecipeInfo(inputType, event) {
    this.props.setRecipeInfo(inputType, event.target.value);
  }
  changeActiveTab(tabName = "Basic Info") {
    if (this.props.recipeInfo.title.trim()) {
      this.props.changeActiveTab(tabName);
    } else {
      this.setState({
        validationErrorMessage: { title: true },
      });
      this.props.alert.info("You gotta give some Title!");
      setTimeout(() => {
        this.setState({
          validationErrorMessage: { title: false },
        });
      }, 100);
    }
  }
  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.props.setTagsForRecipe(this.state.tag);
      this.setState({ tag: "" });
    }
  };
  setTagForRecipe = (event) => {
    this.setState({ tag: event.target.value });
  };
  handleOnRemoveTag(tag) {
    this.props.removeTag(tag);
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.recipeInfo.tags.length !== prevProps.recipeInfo.tags.length
    ) {
      this.enterIcon.current.style.transform =
        "rotate(90deg) translateY(-15px) translateX(4px)";
      setTimeout(() => {
        this.enterIcon.current.style.transform =
          "rotate(90deg) translateY(-15px)";
      }, 200);
    }
  };
  render() {
    const style = {
      titleStyle: { width: "60%" },
      writerStyle: { width: "40%" },
      tagsStyle: { width: "40%" },
    };
    const tags = this.props.recipeInfo.tags.map((tag) => (
      <span className={classes["tag"]} key={uniqid()}>
        <div
          className={classes["remove"]}
          title="Remove"
          onClick={this.handleOnRemoveTag.bind(this, tag)}
        >
          <i className="fas fa-times" />
        </div>
        <i className="fas fa-hashtag" />
        {tag}
      </span>
    ));
    const tagsBackground =
      this.props.recipeInfo.tags.length > 0
        ? { background: "rgba(0, 0, 0, 0.8)" }
        : { background: "transparent" };
    return (
      <div className={classes["recipe__basic"]}>
        <div className={classes["input__wrapper"]}>
          <Ui.Input
            placeholder="give a title"
            title="title of the new recipe"
            style={style.titleStyle}
            handleOnChange={this.setRecipeInfo.bind(this, "title")}
            value={this.props.recipeInfo.title}
            setFocus={true}
            validationErrorMessage={this.state.validationErrorMessage.title}
          />
          <Ui.Input
            placeholder="give the writer"
            title="Who invented this recipe"
            style={style.writerStyle}
            handleOnChange={this.setRecipeInfo.bind(this, "writer")}
            value={this.props.recipeInfo.writer}
            setFocus={false}
            validationErrorMessage={false}
          />
          <Ui.Input
            placeholder="invent u'r Tags"
            title="Tags for this recipe"
            style={style.tagsStyle}
            onKeyPress={this.handleKeyPress}
            handleOnChange={this.setTagForRecipe}
            value={this.state.tag}
            setFocus={false}
            validationErrorMessage={false}
          />
          <div className={classes["press__Enter"]}>
            <i
              className="fas fa-level-down-alt"
              ref={this.enterIcon}
              title="Press enter after tag!"
            />
          </div>
        </div>
        <div className={classes["tags"]} style={tagsBackground}>
          {tags}
        </div>
        <div className={classes["actions"]}>
          <Ui.Button
            button__Type="dark__button"
            handleOnClick={this.changeActiveTab.bind(this, "Ingredients")}
          >
            Ingredients <i className="far fa-hand-point-right" />
          </Ui.Button>
        </div>
      </div>
    );
  }
}

export default withAlert(BasicInfo);

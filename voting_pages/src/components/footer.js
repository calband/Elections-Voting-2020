import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            play: false,
            pause: true,
        };
        this.url = "https://cb-democracy.s3-us-west-1.amazonaws.com/democracy.wav";
        this.audio = new Audio(this.url);
    };

    play = async () => {
        this.setState({play: true, pause: false});
        await this.audio.play();
    };

    render() {

        return (
            <div>
                <hr/>
                <p>
                    Made with 💙 by Democracy Comm 2020 | ©&nbsp;
                    <a href="http://calband.berkeley.edu/">calband</a>,&nbsp;
                    <a href="http://ebaccay.com/">brvin</a>,&nbsp;
                    <a href="https://youtu.be/lUx4ucLkwfA?t=59/">jamz</a>,&nbsp;
                    <a href="http://samarthgoel.com/">sammy g</a>, and&nbsp;
                    <button class="link" onClick={this.play}>democracy</button>&nbsp;
                    😤
                </p>
            </div>
        );
    }
}

export default Footer;

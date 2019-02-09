//@flow

import autobind from 'autobind-decorator';
import * as mobx from 'mobx';
import * as mobxreact from 'mobx-react';
import React from 'react';
import {Form, Input, Segment} from 'semantic-ui-react';

@autobind
@mobxreact.observer
export default class CalcTU extends React.Component<{}> {
    @mobx.observable charInt = 50;
    @mobx.observable charLuk = 50;
    @mobx.observable level = 59;
    @mobx.observable targetMaxHP = 30196;
    @mobx.observable targetHP = 30196;
    @mobx.observable turnUndeadLevel = 10;

    onIntBlur(event: SyntheticEvent<any>) {
        this.charInt = clamp(event.currentTarget.value, 1, null);
    }

    onIntChange(event: SyntheticEvent<any>) {
        this.charInt = event.currentTarget.value;
    }

    onLevelBlur(event: SyntheticEvent<any>) {
        this.level = clamp(event.currentTarget.value);
    }

    onLevelChange(event: SyntheticEvent<any>) {
        this.level = event.currentTarget.value;
    }

    onLukBlur(event: SyntheticEvent<any>) {
        this.charLuk = clamp(event.currentTarget.value, 1, null);
    }

    onLukChange(event: SyntheticEvent<any>) {
        this.charLuk = event.currentTarget.value;
    }

    onTargetMaxHPBlur(event: SyntheticEvent<any>) {
        this.targetMaxHP = clamp(event.currentTarget.value, 1, null);
        if (this.targetMaxHP < this.targetHP)
            this.targetHP = this.targetMaxHP;
    }

    onTargetMaxHPChange(event: SyntheticEvent<any>) {
        this.targetMaxHP = event.currentTarget.value;
    }

    onTargetHPBlur(event: SyntheticEvent<any>) {
        this.targetHP = clamp(event.currentTarget.value, 1, null);
        if (this.targetHP > this.targetMaxHP)
            this.targetMaxHP = this.targetHP;
    }

    onTargetHPChange(event: SyntheticEvent<any>) {
        this.targetHP = event.currentTarget.value;
    }

    onTurnUndeadLevelBlur(event: SyntheticEvent<any>) {
        this.turnUndeadLevel = clamp(event.currentTarget.value, 1, 10);
    }

    onTurnUndeadLevelChange(event: SyntheticEvent<any>) {
        this.turnUndeadLevel = event.currentTarget.value;
    }

    get chanceToKill() {
        let chance = (this.turnUndeadLevel * 2 + this.level / 10 + this.charInt / 10 + this.charLuk / 10 + (1 - this.targetHP / Math.max(this.targetMaxHP, 1)) * 20) / 100;
        return Math.min(chance.toFixed(2), 0.7);
    }

    render() {
        return (
            <div className="cmp-calc-tu">
                <h2>Turn Undead Calculator</h2>

                <Segment vertical={true}>
                    <Input
                        label={{basic: true, content: 'Base Level'}}
                        onBlur={this.onLevelBlur}
                        onChange={this.onLevelChange}
                        type="number"
                        value={this.level}
                    />

                    <Input
                        label={{basic: true, content: 'Int'}}
                        onBlur={this.onIntBlur}
                        onChange={this.onIntChange}
                        type="number"
                        value={this.charInt}
                    />

                    <Input
                        label={{basic: true, content: 'Luk'}}
                        onBlur={this.onLukBlur}
                        onChange={this.onLukChange}
                        type="number"
                        value={this.charLuk}
                    />
                </Segment>

                <Segment vertical={true}>
                    <Input
                        label={{basic: true, content: 'Turn Undead Level'}}
                        onBlur={this.onTurnUndeadLevelBlur}
                        onChange={this.onTurnUndeadLevelChange}
                        type="number"
                        value={this.turnUndeadLevel}
                    />
                </Segment>

                <Segment vertical={true}>
                    <Input
                        label={{basic: true, content: 'Target HP'}}
                        onBlur={this.onTargetHPBlur}
                        onChange={this.onTargetHPChange}
                        type="number"
                        value={this.targetHP}
                    />

                    <Input
                        label={{basic: true, content: 'Target Max HP'}}
                        onBlur={this.onTargetMaxHPBlur}
                        onChange={this.onTargetMaxHPChange}
                        type="number"
                        value={this.targetMaxHP}
                    />
                </Segment>

                <Segment>
                    Chance to kill undead (0% for minis or MVPs, max 70%):
                    <br />
                    (&lt;level&gt; <span className="blue">({this.turnUndeadLevel})</span> * (2) +
                    &lt;base level&gt; <span className="blue">({this.level})</span> / 10 +
                    &lt;int&gt; <span className="blue">({this.charInt})</span> / 10 +
                    &lt;luk&gt; <span className="blue">({this.charLuk})</span> / 10 +
                    (1 - (&lt;target hp&gt; <span className="blue">({this.targetHP})</span> / &lt;target maxHP&gt; <span className="blue">({this.targetMaxHP})</span>)) * 20) / 100 = {this.chanceToKill}
                </Segment>
            </div>
        );
    }
}

function clamp(num, min=1, max=99) {
    if (min == null && max == null)
        return num;
    if (min == null)
        return Math.min(num, max);
    if (max == null)
        return Math.max(num, min);
    return Math.min(Math.max(num, min), max);
}

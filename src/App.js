import React, {Component} from 'react';
import ListContacts from "./ListContacts";
import * as cpi from "./utils/ContactsAPI"
import CreateContact from "./CreateContact";


class App extends Component
{
	state = {
		contacts: [],
		screen: "list"
	}
	
	componentDidMount()
	{
		cpi.getAll().then(contacts =>
		{
			this.setState(() =>
			({
				contacts
			}))
		})
	}
	
	removeContact = (contact) =>
	{
		this.setState(currentSate =>
		({
			contacts: currentSate.contacts.filter((c) =>
			{
				return c.id !== contact.id
			})
		}))
		cpi.remove(contact)
	}
	
	render()
	{
		return (
			<div>
				{
					this.state.screen === "list" &&
					(
						<ListContacts contacts={this.state.contacts}
						              onDeleteContact={this.removeContact}
						              onNavigate={() =>
						              {
						              	this.setState(() =>
						                ({
							                screen: "create"
						                }))
						              }}/>
					)
				}
				{
					this.state.screen === "create" &&
					(
						<CreateContact/>
					)
				}
			</div>
		);
	}
}

export default App;

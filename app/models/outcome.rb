class Outcome < ActiveRecord::Base
  validates :title, presence: true
  belongs_to :objective
  has_and_belongs_to_many :activities

  def type_list
  	outcome_type = ['Political will', 'Public will', 'Attitudes or beliefs', 'Salience', 'Awareness', 'New champions', 'New advocates', 'Partnerships or alliances', 'Constituency or support-base growth', 'Media coverage', 'Issue reframing', 'Organizational advocacy capacity', 'Organizational visibility or issue recognition', 'Other']
  	return outcome_type
  end
end

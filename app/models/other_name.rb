class OtherName < ActiveRecord::Base
  validates :name, presence: true

  # Based in the Popolo data specification.
  # More info in: http://www.popoloproject.com

  # An alternate or former name.
  # field :name, type: String
  # The date on which the name was adopted.
  # field :start_date, type: DateTime
  # The date on which the name was abandoned.
  # field :end_date, type: DateTime
  # A note, e.g. 'Birth name'.
  # field :note, type: String
end

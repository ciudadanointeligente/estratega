class Indicator < ActiveRecord::Base
  belongs_to :activity
  belongs_to :objective
  belongs_to :outcome
end
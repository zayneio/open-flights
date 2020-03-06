class User < ApplicationRecord
  has_secure_password

  has_many :reviews

  validates_presence_of :email
  validates_uniqueness_of :email
end

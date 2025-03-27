package com.btec.quanlykhohang_api.repositories;

import com.btec.quanlykhohang_api.entities.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByCreatedDateBetween(Date startDate, Date endDate);


}

